import type * as nodes from "../../nodes";
import { ParseError } from "../errors.js";
import type { Parser } from "../types";
import { parse } from "./parse.js";

/**
 * Extracts the `TEXT` from `[TEXT](LINK)` or `[TEXT][ID]`. `text` should always
 * start with `[`.
 */
const extractText = (text: string): [text: string, remainder: string] => {
  // NOTE We're assuming that the text matches the hint.
  let opened = 1;
  for (let index = 1; index < text.length; index++) {
    const char = text[index];
    if (char === "[") {
      opened++;
    } else if (char === "]") {
      opened--;
    } else if (char === "\\") {
      index++;
    }
    if (opened === 0) {
      const remainder = text.slice(index + 1);
      return [text.slice(1, index), remainder];
    }
  }
  throw new ParseError("invalid url text");
};

/**
 * Parser for url.
 */
export const url = {
  hint: (text: string) => text.startsWith("["),
  parse: (text: string): [nodes.Url, remainder: string] => {
    const extractedText = extractText(text);
    const content = extractedText[0];
    text = extractedText[1];
    // TODO Break this up into something more readable.
    const match =
      /^(?:(?:\(([^)\n]+)\))|\[((?:[^\]\n]|\\\])+)\])?/.exec(
        text,
      );

    if (!match) {
      throw new ParseError("invalid url");
    }

    const [all, link, id] = match;
    const remainder = text.slice(all.length);
    const nodes = parse(content);

    const node: nodes.Url =
      link != null
        ? {
            type: "link-url",
            link,
            nodes,
          }
        : {
            type: "id-url",
            id: id ?? content,
            nodes,
          };

    return [node, remainder];
  },
} satisfies Parser<nodes.Url>;
