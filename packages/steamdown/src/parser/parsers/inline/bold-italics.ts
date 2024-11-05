import * as nodes from "../../../nodes";
import { Parser } from "../types";
import { makeWrappedTextParser } from "./util";

/**
 * Parser for bold italics.
 *
 * HACK This is a hack to make it easier to parse italics nested in bold (or is it bold nested in italics?).
 */
export const boldItalics = makeWrappedTextParser<nodes.BoldItalics>(
  "***",
  "bold-italics",
) satisfies Parser<nodes.BoldItalics>;
