import type { Node, Paragraph, Root, Text, InlineNode } from './nodes';
import { ParseError, UnreachableError, ImproperlyConfiguredError } from './errors';

/**
 * A parser for the syntax.
 */
export abstract class Parser<N extends Node> {
  /**
   * Hints if the parser can parse the given syntax.
   * This doesn't guarantee that the text can be parsed if
   * it returns `true`, but if it returns `false` it can't
   * be parsed.
   */
  abstract hint(text: string): boolean;
  /**
   * Parses the given syntax, returning the root node of the
   * syntax tree and the remaining text.
   */
  abstract parse(text: string): [node: N, remainder: string]
}

/**
 * Returns the first successful parse from the given parsers.
 */
const firstSuccessfulParse = <N extends Node>(parsers: Parser<N>[], text: string): [N, remainder: string] | null => {
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
export class TextParser extends Parser<Text> {
  hint(_text: string): true {
    return true;
  }

  parse(text: string): [Text, ''] {
    const node: Text = {
      type: 'text',
      text,
    };
    return [node, ''];
  }

  public static defaultParser(): TextParser {
    return new TextParser();
  }
}

export type InlineParser = TextParser;

/**
 * Parser for a paragraph node.
 */
export class ParagraphParser extends Parser<Paragraph> {
  /**
   * Parsers for inline text.
   */
  private readonly parsers: InlineParser[];

  public constructor(parsers: InlineParser[]) {
    super();
    this.parsers = parsers;
  }

  hint(text: string): boolean {
    return true;
  }

  parse(text: string): [Paragraph, remainder: string] {
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
      const parsed = firstSuccessfulParse(this.parsers, pText);

      if (!parsed) {
        throw new ImproperlyConfiguredError('ParagraphParser must have at least one parser that always succeeds');
      }

      const [node, remainder] = parsed;
      nodes.push(node);
      pText = remainder;
    }

    const node: Paragraph = {
      type: 'paragraph',
      nodes,
    };
    return [node, remainder];
  }

  public static defaultParser(): ParagraphParser {
    return new ParagraphParser([TextParser.defaultParser()]);
  }
}

export class RootParser extends Parser<Root> {
  private readonly parsers: Parser<Node>[];

  public constructor(parsers: Parser<Node>[]) {
    super();
    this.parsers = parsers;
  }

  hint(_text: string): true {
    return true;
  }

  parse(text: string): [Root, ''] {
    const nodes: Node[] = [];

    while (text.length > 0) {
      const result = firstSuccessfulParse(this.parsers, text);
      if (!result) {
        throw new ImproperlyConfiguredError('RootParser must have at least one parser that always succeeds');
      }
      const [node, remainder] = result;
      nodes.push(node);
      text = remainder;
    }

    const node: Root = {
      type: 'root',
      nodes,
    };
    return [node, ''];
  }

  public static defaultParser(): RootParser {
    return new RootParser([ParagraphParser.defaultParser()]);
  }
}
