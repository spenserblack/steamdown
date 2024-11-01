import * as nodes from "../../nodes";
import { firstSuccessfulParse } from "../util";
import { UnreachableError } from "../../errors";
import { BlockParser } from "../types";
import type { Context } from "../../../context";

const parsers: BlockParser[] = [];

export const addParser = (parser: BlockParser, index?: number) => {
  if (index != null) {
    parsers.splice(index, 0, parser);
  } else {
    parsers.push(parser);
  }
};

export const useParsers = (): BlockParser[] => parsers;

/**
 * Parses the given text into a syntax tree.
 *
 * Can mutate the provided context.
 */
export const parse = (text: string, context: Context): nodes.Block[] => {
  const nodes: nodes.Block[] = [];

  while (text.length > 0) {
    const result = firstSuccessfulParse(parsers, text);
    if (!result) {
      throw new UnreachableError("should always be able to parse text");
    }
    const [node, remainder] = result;
    nodes.push(node);
    text = remainder;

    if (node.type === 'reference') {
      context.addLink(node.id, node.url);
    }
  }

  return nodes;
};
