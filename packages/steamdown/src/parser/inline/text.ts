import type * as nodes from "../../nodes";
import type { Parser } from "../types";

/**
 * Parser for a text node. This should never fail to parse.
 */
export const text = {
  hint: () => true,
  parse: (text: string): [nodes.Text, remainder: string] => {
    let remainder = "";
    // NOTE End on special chars to allow for parsing of other nodes, but only if that
    //      special char is not the first character.
    //      A leading run of a special char that no other parser accepted is consumed
    //      as plain text.
    const leadingRunLength = /^([\\*_~{[]|>!)\1*/.exec(text)?.[0].length ?? 1;
    const end = /[\\*_~{[]|>!/.exec(text.slice(leadingRunLength));

    if (end) {
      end.index += leadingRunLength;
      remainder = text.slice(end.index);
      text = text.slice(0, end.index);
    }

    const node: nodes.Text = {
      type: "text",
      text,
    };

    return [node, remainder];
  },
} satisfies Parser<nodes.Text>;
