import * as nodes from "../../nodes";
import { UnreachableError, ParseError } from "../../errors";
import escapeRegExp from "lodash.escaperegexp";
import { Parser } from "../types";
import { variableLengthInlineHelper } from "./util";
import { parse } from "./parsers";

/**
 * Parser for a strike node.
 */
export const strike = {
  hint: (text: string) => text.startsWith("~"),
  parse: (text: string): [nodes.Strike, remainder: string] => {
    const result = variableLengthInlineHelper("~")(text, "strike");
    switch (result) {
      case "no match":
        throw new ParseError("strike must start with ~");
      case "not closed":
        throw new ParseError("strike must be closed");
    }
    const { wrapper, text: innerText } = result;
    const consumedCharCount = wrapper.length + innerText.length + wrapper.length;
    if ([innerText[0], innerText[innerText.length - 1]].some((s) => /\s/.test(s))) {
      throw new ParseError("strike cannot start or end with whitespace");
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
