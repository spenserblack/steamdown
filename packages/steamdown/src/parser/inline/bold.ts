import type * as nodes from "../../nodes";
import type { Parser } from "../types";
import { makeWrappedTextParser } from "./util.js";

/**
 * Parser for a bold node.
 */
export const bold = makeWrappedTextParser<nodes.Bold>(
  "**",
  "bold",
) satisfies Parser<nodes.Bold>;
