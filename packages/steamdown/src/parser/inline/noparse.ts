import type * as nodes from "../../nodes";
import { UnreachableError } from "../errors.js";
import escapeRegExp from "escape-string-regexp";
import type { Parser } from "../types";

/**
 * Parser for noparse spans.
 */
export const noparse = {
  hint: (text: string) => text.startsWith("{"),
  parse: (text: string): [nodes.NoparseSpan, remainder: string] | null => {
    const openingMatch = /^\{+/.exec(text);

    if (!openingMatch) {
      throw new UnreachableError("noparse span must start with {");
    }
    const opening = openingMatch[0];
    const closing = new RegExp(`${escapeRegExp("}".repeat(opening.length))}`);

    const closingIndex = closing.exec(text)?.index;
    if (closingIndex == null) {
      return null;
    }

    let innerText = text.slice(opening.length, closingIndex);

    // If innerText is surrounded by whitespace, remove it.
    if (innerText.startsWith(" ") && innerText.endsWith(" ")) {
      innerText = innerText.trim();
    }

    const remainder = text.slice(closingIndex + opening.length);

    const node: nodes.NoparseSpan = {
      type: "noparse-span",
      text: innerText,
    };

    return [node, remainder];
  },
} satisfies Parser<nodes.NoparseSpan>;
