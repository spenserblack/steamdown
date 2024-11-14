import { Context } from "../context.js";
import { parse as parseBlocks } from "./block/index.js";
import type { Root } from "../nodes";

/**
 * Parses the given text into a syntax tree.
 */
export const parse = (text: string): [tree: Root, context: Context] => {
  const context = new Context();
  const nodes = parseBlocks(text, context);

  const tree: Root = {
    type: "root",
    nodes,
  };

  return [tree, context];
};
