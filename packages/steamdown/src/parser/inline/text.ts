import * as nodes from "../../nodes";
import { Parser } from "../types";

/**
 * Parser for a text node. This should never fail to parse.
 */
export const text = {
  hint: () => true,
  parse: (text: string): [nodes.Text, remainder: string] => {
    let remainder = "";
    // NOTE End on special chars to allow for parsing of other nodes, but only if that
    //      special char is not the first character.
    const end = /[\\*_~{\[]/.exec(text);

    if (end && end.index > 0) {
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
