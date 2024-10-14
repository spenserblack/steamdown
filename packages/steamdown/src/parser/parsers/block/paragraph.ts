import * as nodes from "../../nodes";
import { firstSuccessfulParse } from "../util";
import { UnreachableError } from "../../errors";
import { parse as parseInline } from "../inline";
import { Parser } from "../types";

/**
 * Parser for a paragraph node.
 */
export const paragraph = {
  hint: (_text: string) => true,
  parse: (text: string): [nodes.Paragraph, remainder: string] => {
    const end = /\n\n|$/.exec(text);

    if (!end) {
      throw new UnreachableError();
    }

    const endText = end[0];
    const endIndex = end.index;

    let pText = text.slice(0, endIndex);
    const remainder = text.slice(endIndex + endText.length);

    const nodes = parseInline(pText);

    const node: nodes.Paragraph = {
      type: "paragraph",
      nodes,
    };

    return [node, remainder];
  },
} satisfies Parser<nodes.Paragraph>;
