

import * as nodes from "../../nodes";
import { UnreachableError, ParseError } from "../../errors";
import escapeRegExp from "lodash.escaperegexp";
import { Parser } from "../types";
import { makeWrappedTextParser } from "./util";

const escapable = new Set(["*", "_", "~", "\\", "{", "}", "!", "<", ">"]);
/**
 * Parser for an escaped character.
 */
export const escaped = {
  hint: (text: string) => text.startsWith("\\"),
  parse: (text: string): [nodes.Escaped, remainder: string] => {
    const nextChar = text[1];
    if (!escapable.has(nextChar)) {
      throw new ParseError(`cannot escape ${nextChar}`);
    }
    const node: nodes.Escaped = {
      type: "escaped",
      character: nextChar,
    };
    const remainder = text.slice(2);
    return [node, remainder];
  },
} satisfies Parser<nodes.Escaped>;