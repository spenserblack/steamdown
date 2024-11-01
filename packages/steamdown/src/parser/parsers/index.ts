import * as nodes from "../nodes";
import { Parsed } from "./types";
import { parse as parseBlocks } from "./block";
import { Context } from "../../context";

export * from "./types";

/**
 * Parses the given text into a syntax tree.
 */
export const parse = (text: string): Parsed => {
  const context = new Context();
  const nodes = parseBlocks(text, context);

  const tree: nodes.Root = {
    type: "root",
    nodes,
  };

  return { tree, context };
};
