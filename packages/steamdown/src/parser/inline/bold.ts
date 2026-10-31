import type * as nodes from "../../nodes";
import type { Parser } from "../types";
import { parse } from "./parse.js";

/**
 * Parser for a bold node.
 */
export const bold = {
  hint: (text: string) => text.startsWith("**"),
  parse: (text: string): [nodes.Bold, remainder: string] | null => {
    text = text.slice(2);
    let searchIndex = 0;
    const italicsStartRe = /(?<!\\)\*[^\s*]/g;
    const endRe = /(?<!\\|\s)\*\*/g;
    let endMatch: RegExpExecArray | null;

    // HACK Handle nested italics (**foo *bar* baz** and **foo *bar***). We do a simple
    //      search for italics beginning and end markers, and skip over them.
    //      An italics only counts as nested if it starts before the bold's end marker.
    while (true) {
      endRe.lastIndex = searchIndex;
      endMatch = endRe.exec(text);
      if (!endMatch) {
        return null;
      }
      italicsStartRe.lastIndex = searchIndex;
      const italicsStart = italicsStartRe.exec(text);
      if (!italicsStart || endMatch.index < italicsStart.index) {
        break;
      }
      const italicsEndRe = /(?<!\\|\s)\*/g;
      italicsEndRe.lastIndex = italicsStart.index + 1;
      const italicsEnd = italicsEndRe.exec(text);
      if (!italicsEnd) {
        break;
      }
      searchIndex = italicsEnd.index + 1;
    }

    const innerText = text.slice(0, endMatch.index);
    const remainder = text.slice(endMatch.index + 2);

    const nodes = parse(innerText);

    const node: nodes.Bold = {
      type: "bold",
      nodes,
    };

    return [node, remainder];
  },
} satisfies Parser<nodes.Bold>;
