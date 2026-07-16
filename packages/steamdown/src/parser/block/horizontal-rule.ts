import type * as nodes from "../../nodes";
import type { Parser } from "../types";

/**
 * Parser for a horizontal rule node.
 */
export const horizontalRule = {
  hint: (text: string) => ["---", "***", "___"].some((rule) => text.startsWith(rule)),
  parse: (text: string): [nodes.HorizontalRule, remainder: string] | null => {
    const match = /^(?:---+|___+|\*\*\*+)(?:(?:\r?\n)+|$)/.exec(text);

    if (!match) {
      return null;
    }

    const remainder = text.slice(match[0].length);
    const node: nodes.HorizontalRule = {
      type: "horizontal-rule",
    };

    return [node, remainder];
  },
} satisfies Parser<nodes.HorizontalRule>;
