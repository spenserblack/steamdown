import type * as nodes from "../../nodes";
import type { Parser } from "../types";
import { variableLengthInlineHelper } from "./util.js";
import { parse } from "./parse.js";

const helper = variableLengthInlineHelper("~");

/**
 * Parser for a strike node.
 */
export const strike = {
  hint: (text: string) => text.startsWith("~"),
  parse: (text: string): [nodes.Strike, remainder: string] | null => {
    const result = helper(text);
    if (result == null) {
      return null;
    }
    const { wrapper, text: innerText } = result;
    const consumedCharCount = wrapper.length + innerText.length + wrapper.length;
    if ([innerText[0], innerText[innerText.length - 1]].some((s) => /\s/.test(s))) {
      return null;
    }
    const nodes = parse(innerText);

    const node: nodes.Strike = {
      type: "strike",
      nodes,
    };
    const remainder = text.slice(consumedCharCount);
    return [node, remainder];
  },
} satisfies Parser<nodes.Strike>;
