import * as nodes from "../../../nodes";
import { Parser } from "../types";
import { makeWrappedTextParser } from "./util";

/**
 * Parser for an italics node.
 */
export const italics = makeWrappedTextParser<nodes.Italics>(
  "*",
  "italics",
) satisfies Parser<nodes.Italics>;
