import remarkParse from 'remark-parse';
import remarkGfm from "remark-gfm";
import { unified } from "unified";

const processer = unified().use(remarkParse).use(remarkGfm);

/**
 * Renders the given Markdown string to Steam's text format.
 */
export default async function parse(input: string): Promise<string> {
  const processed = await processer.process(input);
  return String(processed);
}
