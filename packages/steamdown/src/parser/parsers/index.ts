import * as nodes from "../nodes";
import { Parsed } from "./types";
import { parse as parseBlocks } from "./block";

export * from "./types";

/**
 * Parses the given text into a syntax tree.
 */
export const parse = (text: string): Parsed => {
  const [nodes, context] = parseBlocks(text);

  const tree: nodes.Root = {
    type: "root",
    nodes,
  };

  return { tree, context };
};
