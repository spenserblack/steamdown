import type * as nodes from "../../nodes";
import type { Parser } from "../types";
import { ParseError, UnreachableError } from "../errors";
import { makeWrappedTextParser } from "./util.js";
import { parse } from "./parse";

/**
 * Parser for an italics node.
 */
export const italics = {
  hint: (text: string) => text.startsWith("*"),
  parse: (text: string): [nodes.Italics, remainder: string] => {
    text = text.slice(1);

    // NOTE This might invalidate the text "*foo**", which could be considered as
    //      italicized "foo" followed by "*". Supporting this malformed text is not a
    //      priority, and the user can escape the trailing "*" to avoid this.
    const close = /(?<!\\|\s|[^\\]\*)\*(?!\*)/.exec(text);
    if (!close) {
      throw new ParseError("italics must be closed");
    }

    const innerText = text.slice(0, close.index);
    const remainder = text.slice(close.index + 1);

    const nodes = parse(innerText);

    const node: nodes.Italics = {
      type: "italics",
      nodes,
    };

    return [node, remainder];
  },
} satisfies Parser<nodes.Italics>;
