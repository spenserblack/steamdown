import * as nodes from "../../nodes";
import { UnreachableError, ParseError } from "../../errors";
import escapeRegExp from "lodash.escaperegexp";
import { Parser } from "../types";
import { parse } from "./parsers";

/**
 * Parser for url.
 */
export const url = {
  hint: (text: string) => text.startsWith("["),
  parse: (text: string): [nodes.Url, remainder: string] => {
    // TODO Break this up into something more readable.
    const match = /^\[(?<text>(?:[^\]]|\\\])+)(?<!\\)\](?:(?:\((?<link>[^)\n]+)\))|\[(?<id>(?:[^\]\n]|\\\])+)\])?/.exec(text);
    const groups = match?.groups;

    if (!groups) {
      throw new ParseError("invalid url");
    }

    const remainder = text.slice(match[0].length);

    const node: nodes.Url = groups.link != null ? {
      type: "link-url",
      link: groups.link,
      nodes: parse(groups.text),
    } : {
      type: "id-url",
      id: groups.id ?? groups.text,
      nodes: parse(groups.text),
    };

    return [node, remainder];
  },
} satisfies Parser<nodes.Url>;
