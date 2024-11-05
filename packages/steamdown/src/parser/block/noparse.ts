import * as nodes from "../../nodes";
import { UnreachableError, ParseError } from "../errors";
import { Parser } from "../types";
import escapeRegExp from "lodash.escaperegexp";

/**
 * Parser for a noparse block node.
 */
export const noparse = {
  hint: (text: string) => /^{{{+\r?\n/.test(text),
  parse: (text: string): [nodes.NoparseBlock, remainder: string] => {
    const open = /^({{{+)\r?\n/.exec(text);
    if (!open) {
      throw new UnreachableError();
    }

    const openBraces = open[1];

    const closeBraces = "}".repeat(openBraces.length);
    const close = (new RegExp(`\\r?\\n${escapeRegExp(closeBraces)}(?:$|(?:\r?\n)+)`)).exec(text);

    if (!close) {
      throw new ParseError("noparse block must be closed");
    }

    const closeIndex = close.index;
    const innerText = text.slice(open[0].length, closeIndex);
    const remainder = text.slice(closeIndex + close[0].length);

    const node: nodes.NoparseBlock = {
      type: "noparse-block",
      text: innerText,
    };

    return [node, remainder];
  },
} satisfies Parser<nodes.NoparseBlock>;
