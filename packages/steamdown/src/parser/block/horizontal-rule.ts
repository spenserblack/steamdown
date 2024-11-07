import type * as nodes from "../../nodes";
import { ParseError, UnreachableError } from "../errors.js";
import { parse as parseInline } from "../inline/index.js";
import type { Parser } from "../types";

/**
 * Parser for a horizontal rule node.
 */
export const horizontalRule = {
  hint: (text: string) => ["---", "***", "___"].some((rule) => text.startsWith(rule)),
  parse: (text: string): [nodes.HorizontalRule, remainder: string] => {
    const match = /^(?:---+|___+|\*\*\*+)(?:(?:\r?\n)+|$)/.exec(text);

    if (!match) {
      throw new ParseError("Invalid horizontal rule");
    }

    const remainder = text.slice(match[0].length);
    const node: nodes.HorizontalRule = {
      type: "horizontal-rule",
    };

    return [node, remainder];
  },
} satisfies Parser<nodes.HorizontalRule>;
