import * as nodes from "../../nodes";
import { UnreachableError } from "../errors";
import { parse as parseInline } from "../inline";
import { Parser } from "../types";

/**
 * Parser for a paragraph node.
 */
export const paragraph = {
  hint: () => true,
  parse: (text: string): [nodes.Paragraph, remainder: string] => {
    // NOTE If a quote starts on the next line, it should stop the paragraph. It is
    //      currently enforced that quotes *must* have a space (`> `) to avoid
    //      conflicts with spoilers (`>!`).
    const match = /^(?:(?:>[^ ]|[^>\n])[^\n]*(?:\r?\n|$))+/.exec(text);

    if (!match) {
      throw new UnreachableError(`"${text}" did not match paragraph`);
    }

    const remainder = text.slice(match[0].length);

    const nodes = parseInline(match[0].trimEnd());

    const node: nodes.Paragraph = {
      type: "paragraph",
      nodes,
    };

    return [node, remainder];
  },
} satisfies Parser<nodes.Paragraph>;
