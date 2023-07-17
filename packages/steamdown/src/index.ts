import { tokenize } from "./tokenize";
import { render } from "./render";

/**
 * Renders the given Markdown string to Steam's text format.
 */
export default function parse(input: string): string {
  return render(tokenize(input));
}
