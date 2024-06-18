import * as nodes from "./nodes";
import { ParseError, UnreachableError } from "./errors";
import escapeRegExp from "lodash.escaperegexp";

/**
 * A parser for the syntax.
 */
export interface Parser<N extends nodes.Node> {
  /**
   * Hints if the parser can parse the given syntax.
   * This doesn't guarantee that the text can be parsed if
   * it returns `true`, but if it returns `false` it can't
   * be parsed.
   */
  hint(text: string): boolean;
  /**
   * Parses the given syntax, returning the root node of the
   * syntax tree and the remaining text.
   */
  parse(text: string): [node: N, remainder: string];
}

export type InlineParser = Parser<nodes.Inline>;

/**
 * Data provided by the text that is not rendered in the final output.
 *
 * E.g. `[link]: https://example.com` would be a link definition.
 */
export type Context = {
  /**
   * Map of link IDs to URLs.
   */
  links: Record<string, string>;
};

export type Parsed = {
  tree: nodes.Root;
  context: Context;
};

/**
 * Returns the first successful parse from the given parsers.
 */
const firstSuccessfulParse = <N extends nodes.Node>(
  parsers: Parser<N>[],
  text: string,
): [N, remainder: string] | null => {
  for (const parser of parsers) {
    if (parser.hint(text)) {
      try {
        return parser.parse(text);
      } catch (error) {
        if (!(error instanceof ParseError)) {
          throw error;
        }
      }
    }
  }
  return null;
};

/**
 * Helper for `makeWrappedTextParser`.
 */
type WrappedNode = Exclude<nodes.Inline, nodes.Text>;

/**
 * Creates a parser for wrapped text.
 *
 * For example, `*foo*` is `foo` wrapped in `*`.
 */
const makeWrappedTextParser = <N extends WrappedNode>(
  wrapper: string,
  type: N["type"],
) => {
  const endRegex = new RegExp(`(?<!\\\\)${escapeRegExp(wrapper)}`);
  return {
    hint: (text: string) => text.startsWith(wrapper),
    parse: (text: string): [N, remainder: string] => {
      text = text.slice(wrapper.length);

      const endMatch = endRegex.exec(text);
      if (!endMatch) {
        throw new ParseError(`${type} must be closed`);
      }
      const innerEndIndex = endMatch.index;

      const innerText = text.slice(0, endMatch.index);

      if (innerText.length === 0) {
        throw new ParseError(`${type} must have content`);
      }

      if ([innerText[0], innerText[innerText.length - 1]].some((s) => /\s/.test(s))) {
        throw new ParseError(`${type} cannot start or end with whitespace`);
      }

      if (/\n\n/.test(innerText)) {
        throw new ParseError(`${type} cannot contain newlines`);
      }

      const remainder = text.slice(innerEndIndex + wrapper.length);

      const nodes = parseInline(innerText);

      const node = {
        type,
        nodes,
      };

      return [node as N, remainder];
    },
  };
};

/**
 * Creates a helper for wrapped text for inline formatting, where the wrapper can be variable length.
 *
 * For example, both `~foo~` and `~~foo~~` would be `[strike]foo[/strike]`.
 *
 * This will return a helper that returns the text used for wrapping (`~~`) and the wrapped text.
 * It will not perform much validation besides asserting that the text is wrapped.
 *
 * # Example
 *
 * ```typescript
 * const helper = variableLengthInlineHelper("~");
 * helper("foo ~~bar~~ baz"); // { wrapper: "~~", text: "bar" }
 * ```
 */
const variableLengthInlineHelper = (wrapperChar: string) => {
  if (wrapperChar.length !== 1) {
    throw new UnreachableError("wrapperChar must be a single character");
  }
  const regex = new RegExp(`^(?:(?!<\\\\)${escapeRegExp(wrapperChar)})+`);

  return (text: string, t: string) => {
    const wrapperMatch = regex.exec(text);
    if (!wrapperMatch) {
      return "no match";
    }
    const wrapper = wrapperMatch[0];
    const endRegex = new RegExp(`(?<!\\\\)${escapeRegExp(wrapper)}`);
    text = text.slice(wrapper.length);
    const endMatch = endRegex.exec(text);

    if (!endMatch) {
      return "not closed";
    }

    text = text.slice(0, endMatch.index);

    return { wrapper, text };
  };
};

/**
 * Parser for bold italics.
 *
 * HACK This is a hack to make it easier to parse italics nested in bold (or is it bold nested in italics?).
 */
const boldItalicsParser = makeWrappedTextParser<nodes.BoldItalics>(
  "***",
  "bold-italics",
) satisfies Parser<nodes.BoldItalics>;

/**
 * Parser for a bold node.
 */
const boldParser = makeWrappedTextParser<nodes.Bold>(
  "**",
  "bold",
) satisfies Parser<nodes.Bold>;

/**
 * Parser for an italics node.
 */
const italicsParser = makeWrappedTextParser<nodes.Italics>(
  "*",
  "italics",
) satisfies Parser<nodes.Italics>;

/**
 * Parser for an underline node.
 */
const underlineParser = makeWrappedTextParser<nodes.Underline>(
  "_",
  "underline",
) satisfies Parser<nodes.Underline>;

/**
 * Parser for a strike node.
 */
const strikeParser = {
  hint: (text: string) => text.startsWith("~"),
  parse: (text: string): [nodes.Strike, remainder: string] => {
    const result = variableLengthInlineHelper("~")(text, "strike");
    switch (result) {
      case "no match":
        throw new ParseError("strike must start with ~");
      case "not closed":
        throw new ParseError("strike must be closed");
    }
    const { wrapper, text: innerText } = result;
    const consumedCharCount = wrapper.length + innerText.length + wrapper.length;
    if ([innerText[0], innerText[innerText.length - 1]].some((s) => /\s/.test(s))) {
      throw new ParseError("strike cannot start or end with whitespace");
    }
    const nodes = parseInline(innerText);

    const node: nodes.Strike = {
      type: "strike",
      nodes,
    };
    const remainder = text.slice(consumedCharCount);
    return [node, remainder];
  },
} satisfies Parser<nodes.Strike>;

/**
 * Parser for a text node. This should never fail to parse.
 */
const textParser = {
  hint: (_text: string) => true,
  parse: (text: string): [nodes.Text, remainder: string] => {
    let remainder = "";
    // NOTE End on special chars to allow for parsing of other nodes, but only if that
    //      special char is not the first character.
    const end = /[*_~]/.exec(text);

    if (end && end.index > 0) {
      remainder = text.slice(end.index);
      text = text.slice(0, end.index);
    }

    const node: nodes.Text = {
      type: "text",
      text,
    };

    return [node, remainder];
  },
} satisfies Parser<nodes.Text>;

const inlineParsers: InlineParser[] = [
  boldItalicsParser,
  boldParser,
  italicsParser,
  underlineParser,
  strikeParser,
  textParser,
];

/**
 * Parses text into inline nodes.
 */
const parseInline = (text: string): nodes.Inline[] => {
  let parsedText = text;
  const nodes: nodes.Inline[] = [];

  while (parsedText.length > 0) {
    const parsed = firstSuccessfulParse(inlineParsers, parsedText);

    if (!parsed) {
      throw new UnreachableError();
    }

    const [node, remainder] = parsed;

    parsedText = remainder;

    // HACK If the last node is a text node and this node is a text node,
    //      merge them together.
    // NOTE undefined to handle the very start of iteration.
    const lastNode: nodes.Inline | undefined = nodes[nodes.length - 1];
    if (lastNode && lastNode.type === "text" && node.type === "text") {
      lastNode.text += node.text;
    } else {
      nodes.push(node);
    }
  }

  return nodes;
};

/**
 * Parser for a paragraph node.
 */
const paragraphParser = {
  hint: (_text: string) => true,
  parse: (text: string): [nodes.Paragraph, remainder: string] => {
    const end = /\n\n|$/.exec(text);

    if (!end) {
      throw new UnreachableError();
    }

    const endText = end[0];
    const endIndex = end.index;

    let pText = text.slice(0, endIndex);
    const remainder = text.slice(endIndex + endText.length);

    const nodes = parseInline(pText);

    const node: nodes.Paragraph = {
      type: "paragraph",
      nodes,
    };

    return [node, remainder];
  },
} satisfies Parser<nodes.Paragraph>;

const blockParsers: Parser<nodes.Block>[] = [paragraphParser];

/**
 * Parses the given text into a syntax tree.
 */
export const parse = (text: string): Parsed => {
  const nodes: nodes.Node[] = [];
  const context: Context = {
    links: {},
  };

  while (text.length > 0) {
    const result = firstSuccessfulParse(blockParsers, text);
    if (!result) {
      throw new UnreachableError("should always be able to parse text");
    }
    const [node, remainder] = result;
    nodes.push(node);
    text = remainder;
  }

  const tree: nodes.Root = {
    type: "root",
    nodes,
  };

  return { tree, context };
};
