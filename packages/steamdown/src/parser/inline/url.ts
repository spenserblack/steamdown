import * as nodes from "../../nodes";
import { UnreachableError, ParseError } from "../errors";
import escapeRegExp from "escape-string-regexp";
import { Parser } from "../types";
import { parse } from "./parse";

/**
 * Parser for url.
 */
export const url = {
  hint: (text: string) => text.startsWith("["),
  parse: (text: string): [nodes.Url, remainder: string] => {
    // TODO Break this up into something more readable.
    const match =
      /^\[((?:[^\]]|\\\])+)(?<!\\)\](?:(?:\(([^)\n]+)\))|\[((?:[^\]\n]|\\\])+)\])?/.exec(
        text,
      );

    if (!match) {
      throw new ParseError("invalid url");
    }

    const [all, content, link, id] = match;
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
