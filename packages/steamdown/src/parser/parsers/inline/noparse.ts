import * as nodes from "../../../nodes";
import { UnreachableError, ParseError } from "../../errors";
import escapeRegExp from "lodash.escaperegexp";
import { Parser } from "../types";

/**
 * Parser for noparse spans.
 */
export const noparse = {
  hint: (text: string) => text.startsWith("{"),
  parse: (text: string): [nodes.NoparseSpan, remainder: string] => {
    const openingMatch = /^\{+/.exec(text);

    if (!openingMatch) {
      throw new UnreachableError("noparse span must start with {");
    }
    const opening = openingMatch[0];
    const closing = new RegExp(`${escapeRegExp("}".repeat(opening.length))}`);

    const closingIndex = closing.exec(text)?.index;
    if (closingIndex == null) {
      throw new ParseError("noparse span must be closed");
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
