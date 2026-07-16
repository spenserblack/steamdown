import type * as nodes from "../../nodes";
import type { Parser } from "../types";
import { url as urlParser } from "./url.js";

/**
 * Parser for an image node.
 */
export const image = {
  hint: (text: string) => text.startsWith("!["),
  parse: (text: string): [nodes.Image, remainder: string] | null => {
    text = text.slice(1);
    const parsed = urlParser.parse(text);
    if (parsed == null) {
      return null;
    }
    const [url, remainder] = parsed;
    const node: nodes.Image = {
      type: "image",
      url,
    };
    return [node, remainder];
  },
} satisfies Parser<nodes.Image>;
