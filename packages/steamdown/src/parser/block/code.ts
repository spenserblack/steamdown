import * as nodes from "../../nodes";
import { UnreachableError, ParseError } from "../errors";
import { Parser } from "../types";
import { Memoizer } from "../util";
import escapeRegExp from "lodash.escaperegexp";

const memo = new Memoizer<string, RegExp>();

/**
 * Parser for a code block node.
 */
export const code = {
  hint: (text: string) => /^```+\r?\n/.test(text),
  parse: (text: string): [nodes.CodeBlock, remainder: string] => {
    const open = /^(```+)\r?\n/.exec(text);
    if (!open) {
      throw new UnreachableError();
    }

    const openBraces = open[1];

    const close = memo.getOrCreate(openBraces, () => {
      const closeBraces = "`".repeat(openBraces.length);
      return new RegExp(`\\r?\\n${escapeRegExp(closeBraces)}(?:$|(?:\r?\n)+)`)
    }).exec(text);

    if (!close) {
      throw new ParseError("code block must be closed");
    }

    const closeIndex = close.index;
    const innerText = text.slice(open[0].length, closeIndex);
    const remainder = text.slice(closeIndex + close[0].length);

    const node: nodes.CodeBlock = {
      type: "code-block",
      text: innerText,
    };

    return [node, remainder];
  },
} satisfies Parser<nodes.CodeBlock>;