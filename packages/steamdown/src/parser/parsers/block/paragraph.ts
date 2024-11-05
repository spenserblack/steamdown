import * as nodes from "../../../nodes";
import { UnreachableError } from "../../errors";
import { parse as parseInline } from "../inline";
import { Parser } from "../types";

/**
 * Parser for a paragraph node.
 */
export const paragraph = {
  hint: () => true,
  parse: (text: string): [nodes.Paragraph, remainder: string] => {
    const end = /\r?\n\r?\n|$/.exec(text);

    if (!end) {
      throw new UnreachableError();
    }

    const endText = end[0];
    const endIndex = end.index;

    const pText = text.slice(0, endIndex);
    const remainder = text.slice(endIndex + endText.length);

    const nodes = parseInline(pText);

    const node: nodes.Paragraph = {
      type: "paragraph",
      nodes,
    };

    return [node, remainder];
  },
} satisfies Parser<nodes.Paragraph>;
