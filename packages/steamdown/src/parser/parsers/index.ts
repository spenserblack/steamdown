import * as nodes from "../nodes";
import { ParseError, UnreachableError } from "../errors";
import { Parser, Context, InlineParser, Parsed } from "./types";
import { firstSuccessfulParse } from "./util";
import escapeRegExp from "lodash.escaperegexp";
import { parse as parseInlines } from "./inline";
import { parse as parseBlocks } from "./block";
import { BlockParser } from "./types";

export * from './types';

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
