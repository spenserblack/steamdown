import * as nodes from "../nodes";

/**
 * A parser for the syntax.
 */
export interface Parser<N extends nodes.Node> {
  /**
   * Hints if the parser can parse the given syntax.
   * This doesn't guarantee that the text can be parsed if
   * it returns `true`, but if it returns `false` it can't
   * be parsed.
   */
  hint(text: string): boolean;
  /**
   * Parses the given syntax, returning the root node of the
   * syntax tree and the remaining text.
   */
  parse(text: string): [node: N, remainder: string];
}

export type InlineParser = Parser<nodes.Inline>;

/**
 * Data provided by the text that is not rendered in the final output.
 *
 * E.g. `[link]: https://example.com` would be a link definition.
 */
export type Context = {
  /**
   * Map of link IDs to URLs.
   */
  links: Record<string, string>;
};

export type Parsed = {
  tree: nodes.Root;
  context: Context;
};
