import { Context } from "../context.js";
import type { Parsed } from "./types";
import { parse as parseBlocks } from "./block/index.js";
import type { Root } from "../nodes";

/**
 * Parses the given text into a syntax tree.
 */
export const parse = (text: string): Parsed => {
  const context = new Context();
  const nodes = parseBlocks(text, context);

  const tree: Root = {
    type: "root",
    nodes,
  };

  return { tree, context };
};
