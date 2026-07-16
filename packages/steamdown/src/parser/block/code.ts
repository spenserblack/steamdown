import type * as nodes from "../../nodes";
import { UnreachableError } from "../errors.js";
import type { Parser } from "../types";
import { Memoizer } from "../util.js";
import escapeRegExp from "escape-string-regexp";

const memo = new Memoizer<string, RegExp>();

/**
 * Parser for a code block node.
 */
export const code = {
  hint: (text: string) => /^`{3,}[^`\r\n]*\r?\n/.test(text),
  parse: (text: string): [nodes.CodeBlock, remainder: string] | null => {
    const open = /^(`{3,})[^`\r\n]*\r?\n/.exec(text);
    if (!open) {
      throw new UnreachableError();
    }

    const openBraces = open[1];

    const close = memo
      .getOrCreate(openBraces, () => {
        const closeBraces = "`".repeat(openBraces.length);
        return new RegExp(`\\r?\\n${escapeRegExp(closeBraces)}(?:$|(?:\r?\n)+)`);
      })
      .exec(text);

    if (!close) {
      return null;
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
