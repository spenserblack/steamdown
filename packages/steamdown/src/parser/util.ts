import * as nodes from "../nodes";
import { Parser } from "./types";
import { ParseError } from "./errors";

/**
 * Returns the first successful parse from the given parsers.
 */
export const firstSuccessfulParse = <N extends nodes.Node>(
  parsers: Parser<N>[],
  text: string,
): [N, remainder: string] | null => {
  for (const parser of parsers) {
    if (parser.hint(text)) {
      try {
        return parser.parse(text);
      } catch (error) {
        if (!(error instanceof ParseError)) {
          throw error;
        }
      }
    }
  }
  return null;
};
