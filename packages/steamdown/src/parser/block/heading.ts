import type * as nodes from "../../nodes";
import { ParseError } from "../errors.js";
import { parse as parseInline } from "../inline/index.js";
import type { Parser } from "../types";

/**
 * Parser for a heading node starting with a `#`.
 */
export const heading = {
  hint: (text: string) => text.startsWith("#"),
  parse: (text: string): [nodes.Heading, remainder: string] => {
    const match = /^(#{1,6})\s(.+)(?:(?:\r?\n){1,2}|$)/.exec(text);

    if (!match) {
      throw new ParseError("Invalid heading");
    }

    const headingText = match[2];
    const remainder = text.slice(match[0].length);

    const nodes = parseInline(headingText);

    const node: nodes.Heading = {
      type: "heading",
      level: match[1].length as 1 | 2 | 3 | 4 | 5 | 6,
      nodes,
    };

    return [node, remainder];
  },
} satisfies Parser<nodes.Heading>;

/**
 * Alternative format for heading.
 *
 * ```markdown
 * Heading 1
 * =========
 * ```
 *
 * ```markdown
 * Heading 2
 * ---------
 *  ```
 */
export const altHeading = {
  hint: (text: string) => /^.+\r?\n(?:===+|---+)/.test(text),
  parse: (text: string): [nodes.Heading, remainder: string] => {
    const match = /^(.+)\r?\n(===+|---+)(?:(?:\r?\n){1,2}|$)/.exec(text);

    if (!match) {
      throw new ParseError("Invalid heading");
    }

    const headingText = match[1];
    const remainder = text.slice(match[0].length);

    const nodes = parseInline(headingText);

    const node: nodes.Heading = {
      type: "heading",
      level: match[2].startsWith("=") ? 1 : 2,
      nodes,
    };

    return [node, remainder];
  },
} satisfies Parser<nodes.Heading>;
