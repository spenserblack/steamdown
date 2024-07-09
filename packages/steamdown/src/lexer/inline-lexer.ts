import * as tokens from "./inline-tokens";
import { Position, PositionHelper } from "./position";

/**
 * A lexed token, consisting of the token, the text that was lexed, and the position in the text.
 */
export type Lexed = [token: tokens.Token, text: string, position: Position];
/**
 * A function that gets the next lexed token.
 */
export type Next = () => Lexed;
/**
 * A function that checks if there are more tokens to lex.
 */
export type HasNext = () => boolean;

const specialChars = new Set(["*", "_", "~", "\\", "{", "}", ">", "<", "!"]);
type SpecialCharRecord = Record<string, [tokens.Token, string] | undefined>;
const specialCharMap: SpecialCharRecord = {
  "*": [tokens.asterisk, "*"],
  _: [tokens.underscore, "_"],
  "~": [tokens.tilde, "~"],
  "\\": [tokens.escape, "\\"],
  "{": [tokens.leftCurly, "{"],
  "}": [tokens.rightCurly, "}"],
  ">": [tokens.greaterThan, ">"],
  "<": [tokens.lessThan, "<"],
  "!": [tokens.exclamation, "!"],
};

/**
 * Creates lexer utilities for lexing inline text.
 *
 * @param text The text to lex.
 */
export const lexer = (text: string): [Next, HasNext] => {
  const position = new PositionHelper();

  const hasNext: HasNext = () => text.length > 0;
  const next: Next = () => {
    const pos = position.clone();
    const char = text[0];

    const specialChar = specialCharMap[char];
    if (specialChar) {
      text = text.slice(1);
      position.x++;
      return [specialChar[0], specialChar[1], pos];
    }

    if (char === "\n") {
      text = text.slice(1);
      position.newline();
      return [tokens.newline, "\n", pos];
    }

    let index: number;

    for (index = 0; index < text.length; ++index) {
      const char = text[index];
      if (char === "\n" || specialChars.has(char)) {
        break;
      }
      position.x++;
    }
    const slice = text.slice(0, index);
    text = text.slice(index);
    return [tokens.text, slice, pos];
  };
  return [next, hasNext];
};

/**
 * Lexes all tokens from the given text. Note that it can be safer to use the lexer function directly,
 * as a bug in this function could lead to an infinite loop.
 */
export const lexAll = (text: string): Lexed[] => {
  const lexed: Lexed[] = [];
  const [next, hasNext] = lexer(text);
  while (hasNext()) {
    lexed.push(next());
  }
  return lexed;
};
