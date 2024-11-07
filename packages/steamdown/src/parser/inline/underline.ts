import type * as nodes from "../../nodes";
import type { Parser } from "../types";
import { makeWrappedTextParser } from "./util.js";

/**
 * Parser for an underline node.
 */
export const underline = makeWrappedTextParser<nodes.Underline>(
  "_",
  "underline",
) satisfies Parser<nodes.Underline>;
