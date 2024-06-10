import type { Node, Paragraph, Root, Text, InlineNode, BlockNode } from "./nodes";
import { ParseError, UnreachableError } from "./errors";

/**
 * A parser for the syntax.
 */
export interface Parser<N extends Node> {
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

export type InlineParser = Parser<InlineNode>;

/**
 * Returns the first successful parse from the given parsers.
 */
const firstSuccessfulParse = <N extends Node>(
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
 * Parser for a text node. This should never fail to parse.
 */
const textParser = {
  hint: (_text: string) => true,
  parse: (text: string): [Text, ""] => {
    const node: Text = {
      type: "text",
      text,
    };
    return [node, ""];
  },
} satisfies Parser<Text>;

const inlineParsers: InlineParser[] = [textParser];

/**
 * Parser for a paragraph node.
 */
const paragraphParser = {
  hint: (_text: string) => true,
  parse: (text: string): [Paragraph, remainder: string] => {
    const end = /\n\n|$/.exec(text);

    if (!end) {
      throw new UnreachableError();
    }

    const endText = end[0];
    const endIndex = end.index;

    let pText = text.slice(0, endIndex);
    const remainder = text.slice(endIndex + endText.length);

    const nodes: InlineNode[] = [];

    while (pText.length > 0) {
      const parsed = firstSuccessfulParse(inlineParsers, pText);

      if (!parsed) {
        throw new UnreachableError();
      }

      const [node, remainder] = parsed;
      nodes.push(node);
      pText = remainder;
    }

    const node: Paragraph = {
      type: "paragraph",
      nodes,
    };

    return [node, remainder];
  },
} satisfies Parser<Paragraph>;

const blockParsers: Parser<BlockNode>[] = [paragraphParser];

/**
 * Parses the given text into a syntax tree.
 */
export const parse = (text: string): Root => {
  const nodes: Node[] = [];

  while (text.length > 0) {
    const result = firstSuccessfulParse(blockParsers, text);
    if (!result) {
      throw new UnreachableError("should always be able to parse text");
    }
    const [node, remainder] = result;
    nodes.push(node);
    text = remainder;
  }

  const root: Root = {
    type: "root",
    nodes,
  };

  return root;
};
