import Token from "./token";
import Heading from "./heading";
import Italic from "./italic";
import Text from "./text";
import { LexError } from "./errors";
import type { Lexer } from './token';

export { Token, Heading, Italic, Text, LexError };

const lexers: Lexer[] = [Heading];
function reduceLexers(md: string): [token: Token, remainder: string] {
  const hintedLexers = lexers.filter((lexer) => lexer.hint(md));
  for (let i = 0; i < hintedLexers.length; ++i) {
    const lexer = hintedLexers[i];
    const lexed = lexer.lex(md);
    if (lexed) {
      return lexed;
    }
  }
  throw new LexError("Could not lex to any value");
}

export default function lex(md: string): Token[] {
  let tokens: Token[] = [];
  let toLex: string = md;
  while (toLex.trimEnd() !== "") {
    const [token, remainder] = reduceLexers(toLex);
    tokens.push(token);
    toLex = remainder;
  }
  return tokens;
}
