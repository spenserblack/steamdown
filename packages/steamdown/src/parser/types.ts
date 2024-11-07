import type * as nodes from "../nodes";
import type { Context } from "../context";

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
   * syntax tree and the remaining text. Can optionally mutate context.
   */
  parse(text: string): [node: N, remainder: string];
}

export type InlineParser = Parser<nodes.Inline>;
export type BlockParser = Parser<nodes.Block>;

export type Parsed = {
  tree: nodes.Root;
  context: Context;
};
