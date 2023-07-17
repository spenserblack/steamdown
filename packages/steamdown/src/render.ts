import type { fromMarkdown } from "mdast-util-from-markdown";

export type Root = ReturnType<typeof fromMarkdown>;

export function render(root: Root): string {
  const { data } = root;
  if (data == null) {
    return "";
  }
  return JSON.stringify(data);
}
