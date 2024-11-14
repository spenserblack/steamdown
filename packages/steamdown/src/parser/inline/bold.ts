import type * as nodes from "../../nodes";
import type { Parser } from "../types";
import { ParseError } from "../errors";
import { parse } from "./parse";

/**
 * Parser for a bold node.
 */
export const bold = {
  hint: (text: string) => text.startsWith("**"),
  parse: (text: string): [nodes.Bold, remainder: string] => {
    text = text.slice(2);
    let searchIndex = 0;
    const italicsStartRe = /(?<!\\)\*[^\s*]/g;

    // HACK Handle nested italics (**foo *bar* baz** and **foo *bar***). We do a simple
    //      search for italics beginning and end markers, and skip over them.
    while (true) {
      const italicsStart = italicsStartRe.exec(text);
      if (!italicsStart) {
        break;
      }
      const italicsEndRe = /(?<!\\|\s)\*/g;
      italicsEndRe.lastIndex = italicsStart.index + 1;
      const italicsEnd = italicsEndRe.exec(text);
      if (!italicsEnd) {
        break;
      }
      searchIndex = italicsEnd.index + 1;
      italicsStartRe.lastIndex = searchIndex;
    }

    const endRe = /(?<!\\|\s)\*\*/g;
    endRe.lastIndex = searchIndex;
    const endMatch = endRe.exec(text);
    if (!endMatch) {
      throw new ParseError("bold must be closed");
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
