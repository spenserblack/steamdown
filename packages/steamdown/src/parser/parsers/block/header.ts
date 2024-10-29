import * as nodes from "../../nodes";
import { ParseError, UnreachableError } from "../../errors";
import { parse as parseInline } from "../inline";
import { Parser } from "../types";

/**
 * Parser for a header node starting with a `#`.
 */
export const header = {
  hint: (text: string) => text.startsWith("#"),
  parse: (text: string): [nodes.Header, remainder: string] => {
    const match = /^(#{1,6})\s(.+)(?:(?:\r?\n){1,2}|$)/.exec(text);

    if (!match) {
      throw new ParseError("Invalid header");
    }

    const headerText = match[2];
    const remainder = text.slice(match[0].length);

    const nodes = parseInline(headerText);

    const node: nodes.Header = {
      type: "header",
      level: match[1].length as 1 | 2 | 3 | 4 | 5 | 6,
      nodes,
    };

    return [node, remainder];
  },
} satisfies Parser<nodes.Header>;
