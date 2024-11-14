import type * as nodes from "../../nodes";
import type { Parser } from "../types";
import { ParseError } from "../errors";
import { parse } from "./parse";

/**
 * Parser for an italics node.
 */
export const italics = {
  hint: (text: string) => text.startsWith("*"),
  parse: (text: string): [nodes.Italics, remainder: string] => {
    text = text.slice(1);
    let searchIndex = 0;
    const boldStartRe = /(?<!\\)\*\*/g;

    // HACK Handle nested bolds (*foo **bar** baz* and *foo **bar***). We do a simple
    //      search for bold beginning and end markers, and skip over them.

    while (true) {
      const boldStart = boldStartRe.exec(text);
      if (!boldStart) {
        break;
      }
      const boldEndRe = /(?<!\\|\s)\*\*/g;
      boldEndRe.lastIndex = boldStart.index + 2;
      const boldEnd = boldEndRe.exec(text);
      if (!boldEnd) {
        break;
      }
      searchIndex = boldEnd.index + 2;
      boldStartRe.lastIndex = searchIndex;
    }

    const endRe = /(?<!\\|\s)\*/g;
    endRe.lastIndex = searchIndex;
    const endMatch = endRe.exec(text);
    if (!endMatch) {
      throw new ParseError("italics must be closed");
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
