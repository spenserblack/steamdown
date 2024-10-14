

import * as nodes from "../../nodes";
import { UnreachableError, ParseError } from "../../errors";
import escapeRegExp from "lodash.escaperegexp";
import { Parser } from "../types";
import { makeWrappedTextParser } from "./util";

/**
 * Parser for an italics node.
 */
export const italics = makeWrappedTextParser<nodes.Italics>(
  "*",
  "italics",
) satisfies Parser<nodes.Italics>;
