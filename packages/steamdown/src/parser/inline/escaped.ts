import type * as nodes from "../../nodes";
import type { Parser } from "../types";

const escapable = new Set([
  "*",
  "_",
  "~",
  "\\",
  "{",
  "}",
  "!",
  "<",
  ">",
  "`",
  "[",
  "]",
]);
/**
 * Parser for an escaped character.
 */
export const escaped = {
  hint: (text: string) => text.startsWith("\\"),
  parse: (text: string): [nodes.Escaped, remainder: string] | null => {
    const nextChar = text[1];
    if (!escapable.has(nextChar)) {
      return null;
    }
    const node: nodes.Escaped = {
      type: "escaped",
      character: nextChar,
    };
    const remainder = text.slice(2);
    return [node, remainder];
  },
} satisfies Parser<nodes.Escaped>;
