import * as nodes from "../../nodes";
import { parse as parseBlocks } from "./parsers";
import { UnreachableError, ParseError } from "../errors";
import { Parser } from "../types";

type Author = NonNullable<nodes.Quote["author"]>;
const parseAuthor = (text: string): [author: nodes.Quote["author"], remainder: string] => {
  const match = /^\(([^;)]+)(?:;(\d+))?\)(?:\r?\n|$)/.exec(text);
  if (!match) {
    return [undefined, text];
  }
  const author: Author = [match[1], match[2]];
  const remainder = text.slice(match[0].length);

  return [author, remainder];
};

/**
 * Parser for a quote node.
 */
export const quote = {
  hint: (text: string) => text.startsWith("> "),
  parse: (text: string): [nodes.Quote, remainder: string] => {
    const lines = /^(?:>(?: [^\n]*(?:\r?\n|$)|\r?\n|$))+/.exec(text);
    if (!lines) {
      throw new UnreachableError("The hint should ensure that there is at least 1 line");
    }
    const content = lines[0].replace(/^> ?/gm, "");
    const nodes = parseBlocks(content);
    const afterQuote = text.slice(lines[0].length);

    const [author, remainder] = parseAuthor(afterQuote);

    const node: nodes.Quote = {
      type: "quote",
      nodes,
      author,
    };

    return [node, remainder];
  },
} satisfies Parser<nodes.Quote>;
