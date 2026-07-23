import type * as nodes from "../../nodes";
import type { Parser } from "../types";
import { parse } from "./parse.js";

/**
 * Extracts the `TEXT` from `[TEXT](LINK)` or `[TEXT][ID]`. `text` should always
 * start with `[`.
 */
const extractText = (text: string): [text: string, remainder: string] | null => {
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
  return null;
};

/**
 * A URL type and the pattern that matches it.
 */
type UrlPatternTuple = [type: nodes.Url["type"], RegExp];
const urlPatterns: UrlPatternTuple[] = [
  ["link-url", /^\(([^)\n]+)\)/],
  ["id-url", /^\[((?:[^\]\n]|\\\])+)\]/],
];
/**
 * A URL type and the match from `RegExp.exec`.
 */
type UrlMatchTuple = [type: nodes.Url["type"], RegExpExecArray];

/**
 * Gets a match if it exists.
 */
const urlMatch = (
  [t, pattern]: UrlPatternTuple,
  text: string,
): UrlMatchTuple | null => {
  const match = pattern.exec(text);
  return match ? [t, match] : null;
};
/**
 * Gets the first regular expression match.
 */
const firstUrlMatch = (text: string) =>
  urlPatterns.reduce<UrlMatchTuple | null>(
    (match, tuple) => match ?? urlMatch(tuple, text),
    null,
  );

/**
 * Parser for url.
 */
export const url = {
  hint: (text: string) => text.startsWith("["),
  parse: (text: string): [nodes.Url, remainder: string] | null => {
    const extractedText = extractText(text);
    if (extractedText == null) {
      return null;
    }
    const content = extractedText[0];
    text = extractedText[1];
    // NOTE The following `(https://example.com)` or `[id]` are optional. When neither
    //      are found, the content in `[text]` is used as the id.
    const [urlType, match] = firstUrlMatch(text) ?? ["id-url", [""]];

    const [all, linkOrId] = match;
    const remainder = text.slice(all.length);
    const nodes = parse(content);

    const node: nodes.Url =
      urlType === "link-url"
        ? {
            type: "link-url",
            link: linkOrId,
            nodes,
          }
        : {
            type: "id-url",
            id: linkOrId ?? content,
            nodes,
          };

    return [node, remainder];
  },
} satisfies Parser<nodes.Url>;
