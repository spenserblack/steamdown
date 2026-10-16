import type * as nodes from "../../nodes";
import type { Parser } from "../types";
import { parse } from "./parse.js";

/**
 * Parser for an italics node.
 */
export const italics = {
  hint: (text: string) => text.startsWith("*"),
  parse: (text: string): [nodes.Italics, remainder: string] | null => {
    text = text.slice(1);
    let searchIndex = 0;
    const boldStartRe = /(?<!\\)\*\*/g;
    const endRe = /(?<!\\|\s)\*/g;
    let endMatch: RegExpExecArray | null;

    // HACK Handle nested bolds (*foo **bar** baz* and *foo **bar***). We do a simple
    //      search for bold beginning and end markers, and skip over them.
    //      A bold only counts as nested if it starts before the italics' end marker.
    while (true) {
      endRe.lastIndex = searchIndex;
      endMatch = endRe.exec(text);
      if (!endMatch) {
        return null;
      }
      boldStartRe.lastIndex = searchIndex;
      const boldStart = boldStartRe.exec(text);
      if (!boldStart || endMatch.index < boldStart.index) {
        break;
      }
      const boldEndRe = /(?<!\\|\s)\*\*/g;
      boldEndRe.lastIndex = boldStart.index + 2;
      const boldEnd = boldEndRe.exec(text);
      if (!boldEnd) {
        break;
      }
      searchIndex = boldEnd.index + 2;
    }

    if (endMatch.index === 0) {
      return null;
    }

    const innerText = text.slice(0, endMatch.index);
    const remainder = text.slice(endMatch.index + 1);

    const nodes = parse(innerText);

    const node: nodes.Italics = {
      type: "italics",
      nodes,
    };

    return [node, remainder];
  },
} satisfies Parser<nodes.Italics>;
