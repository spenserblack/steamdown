import Token from "./token";
import Heading from "./heading";
import { LexError } from "./errors";
import type { Lexer } from "./token";
export { Bold, Italic, Text, lexInline } from "./inline-tokens";

export { Token, Heading, LexError };

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
