import { fromMarkdown } from "mdast-util-from-markdown";

export function tokenize(input: string) {
  return fromMarkdown(input);
}
