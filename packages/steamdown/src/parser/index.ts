import { Context } from "../context";
import type { Parsed } from "./types";
import { parse as parseBlocks } from "./block";
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
