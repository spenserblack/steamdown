import type * as nodes from "../../nodes";
import { ParseError } from "../errors.js";
import type { Parser } from "../types";

/**
 * Parser for a reference (`[ref]: https://example.com`).
 */
export const reference = {
  hint: (text: string) => text.startsWith("["),
  parse: (text: string): [nodes.Reference, remainder: string] => {
    const match = /\[((?:[^\]]|\\\])+)(?<!\\)\]:\s+(.+)(?:\r?\n)*/.exec(text);

    if (!match) {
      throw new ParseError("invalid reference");
    }

    const [all, id, url] = match;
    const remainder = text.slice(all.length);

    const node: nodes.Reference = {
      type: "reference",
      id,
      url,
    };

    return [node, remainder];
  },
} satisfies Parser<nodes.Reference>;
