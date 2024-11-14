import type * as nodes from "../../nodes";
import { UnreachableError } from "../errors.js";
import { parse as parseInline } from "../inline/index.js";
import type { Parser } from "../types";

/**
 * Parser for a paragraph node.
 */
export const paragraph = {
  hint: () => true,
  parse: (text: string): [nodes.Paragraph, remainder: string] => {
    // NOTE Double-newlines, EOF, quotes, and lists are all valid paragraph breaks.
    const end = /\r?\n^(?:> |- |\* |\d+\. |\r?\n)/m.exec(text) ?? /(?:\r?\n)?$/.exec(text);

    if (!end) {
      throw new UnreachableError("Paragraph must have an end");
    }

    const content = text.slice(0, end.index);

    // NOTE We want to remove leading newlines from the remainder.
    const newlineCount = /^\n+/.exec(end[0])?.[0].length ?? 0;
    const remainder = text.slice(end.index + newlineCount);

    const nodes = parseInline(content);

    const node: nodes.Paragraph = {
      type: "paragraph",
      nodes,
    };

    return [node, remainder];
  },
} satisfies Parser<nodes.Paragraph>;
