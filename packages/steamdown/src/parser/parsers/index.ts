import * as nodes from "../nodes";
import { ParseError, UnreachableError } from "../errors";
import { Parser, Context, InlineParser, Parsed } from "./types";
import { firstSuccessfulParse } from "./util";
import escapeRegExp from "lodash.escaperegexp";
import { parse as parseInline } from "./inline";

export * from './types';

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
