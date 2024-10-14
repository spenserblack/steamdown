import * as nodes from "../../nodes";
import { Parser } from "../types";
import { makeWrappedTextParser } from "./util";

/**
 * Parser for an underline node.
 */
export const underline = makeWrappedTextParser<nodes.Underline>(
  "_",
  "underline",
) satisfies Parser<nodes.Underline>;
