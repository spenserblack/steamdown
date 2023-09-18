import remarkParse from 'remark-parse';
import remarkGfm from "remark-gfm";
import { unified } from "unified";
import { steamify } from './steamify.js';

const processer = unified().use(remarkParse).use(remarkGfm).use(steamify);

/**
 * Renders the given Markdown string to Steam's text format.
 */
export default async function parse(input: string): Promise<string> {
  const parsed = await processer.parse(input);
  console.log('parsed:', JSON.stringify(parsed, null, 2));
  // return String(processed);
  throw new Error("Not implemented");
}
