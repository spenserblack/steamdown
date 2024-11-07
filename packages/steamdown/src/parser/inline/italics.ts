import type * as nodes from "../../nodes";
import type { Parser } from "../types";
import { makeWrappedTextParser } from "./util.js";

/**
 * Parser for an italics node.
 */
export const italics = makeWrappedTextParser<nodes.Italics>(
  "*",
  "italics",
) satisfies Parser<nodes.Italics>;
