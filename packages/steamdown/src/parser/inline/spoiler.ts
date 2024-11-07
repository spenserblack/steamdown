import type * as nodes from "../../nodes";
import type { Parser } from "../types";
import { makeWrappedTextParser } from "./util.js";

/**
 * Parser for a spoiler.
 */
export const spoiler = makeWrappedTextParser<nodes.Spoiler>(
  [">!", "!<"],
  "spoiler",
) satisfies Parser<nodes.Spoiler>;
