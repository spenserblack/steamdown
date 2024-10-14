import * as nodes from "../../nodes";
import { firstSuccessfulParse } from "../util";
import { UnreachableError } from "../../errors";
import { BlockParser, Context } from "../types";

const parsers: BlockParser[] = [];

export const addParser = (parser: BlockParser, index?: number) => {
  if (index != null) {
    parsers.splice(index, 0, parser);
  } else {
    parsers.push(parser);
  }
};

export const useParser = (): BlockParser[] => parsers;


/**
 * Parses the given text into a syntax tree.
 */
export const parse = (text: string): [nodes: nodes.Block[], context: Context] => {
  const nodes: nodes.Block[] = [];
  const context: Context = {
    links: {},
  };

  while (text.length > 0) {
    const result = firstSuccessfulParse(parsers, text);
    if (!result) {
      throw new UnreachableError("should always be able to parse text");
    }
    const [node, remainder] = result;
    nodes.push(node);
    text = remainder;
  }

  return [nodes, context];
};
