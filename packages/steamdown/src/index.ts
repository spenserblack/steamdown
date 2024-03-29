import extensions from "./extensions";
import { marked } from "marked";
import renderer from "./renderer";

marked.setOptions({ breaks: true });
marked.use({ renderer, extensions });
/**
 * Renders the given Markdown string to Steam's text format.
 */
export default function parse(input: string): string {
  return marked.parse(input).replace(/\n+$/, "");
}
