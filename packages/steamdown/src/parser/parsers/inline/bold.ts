import * as nodes from "../../nodes";
import { UnreachableError, ParseError } from "../../errors";
import escapeRegExp from "lodash.escaperegexp";
import { Parser } from "../types";
import { makeWrappedTextParser } from "./util";

/**
 * Parser for a bold node.
 */
export const bold = makeWrappedTextParser<nodes.Bold>(
  "**",
  "bold",
) satisfies Parser<nodes.Bold>;
