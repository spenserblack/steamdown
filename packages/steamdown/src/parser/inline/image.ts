import type * as nodes from "../../nodes";
import { ParseError } from "../errors.js";
import type { Parser } from "../types";
import { parse } from "./parse.js";
import { url as urlParser } from "./url.js";

/**
 * Parser for an image node.
 */
export const image = {
  hint: (text: string) => text.startsWith("!["),
  parse: (text: string): [nodes.Image, remainder: string] => {
    text = text.slice(1);
    const [url, remainder] = urlParser.parse(text);
    const node: nodes.Image = {
      type: "image",
      url,
    };
    return [node, remainder];
  },
} satisfies Parser<nodes.Image>;
