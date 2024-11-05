import * as nodes from "../../../nodes";
import { Parser } from "../types";
import { makeWrappedTextParser } from "./util";

/**
 * Parser for a spoiler.
 */
export const spoiler = makeWrappedTextParser<nodes.Spoiler>(
  [">!", "!<"],
  "spoiler",
) satisfies Parser<nodes.Spoiler>;
