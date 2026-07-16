import type * as nodes from "../nodes";
import type { Parser } from "./types";

/**
 * Returns the first successful parse from the given parsers.
 */
export const firstSuccessfulParse = <N extends nodes.Node>(
  parsers: Parser<N>[],
  text: string,
): [N, remainder: string] | null => {
  for (const parser of parsers) {
    if (parser.hint(text)) {
      return parser.parse(text);
    }
  }
  return null;
};

export class Memoizer<T, U> extends Map<T, U> {
  /**
   * Returns the value associated with the key, or creates a new value using the
   * given function and associates it with the key.
   */
  public getOrCreate(key: T, create: () => U): U {
    if (!this.has(key)) {
      this.set(key, create());
    }
    return this.get(key)!;
  }
}
