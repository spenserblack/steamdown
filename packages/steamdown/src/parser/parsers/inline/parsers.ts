import * as nodes from "../../nodes";
import { firstSuccessfulParse } from "../util";
import { UnreachableError } from "../../errors";
import { InlineParser } from "../types";

const inlineParsers: InlineParser[] = [
  // noparseSpanParser,
  // spoilerParser,
  // boldItalicsParser,
  // boldParser,
  // italicsParser,
  // underlineParser,
  // strikeParser,
  // escapedCharacterParser,
  // textParser,
];

export const addParser = (parser: InlineParser, index?: number) => {
  if (index != null) {
    inlineParsers.splice(index, 0, parser);
  } else {
    inlineParsers.push(parser);
  }
};

export const useParser = (): InlineParser[] => inlineParsers;

/**
 * Parses text into inline nodes.
 */
export const parse = (text: string): nodes.Inline[] => {
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
