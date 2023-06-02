import Token from "./token";
import Heading from "./heading";
import { LexError } from "./errors";

export { Token, Heading, LexError };

/**
 * Returns true if the Markdown should likely be lexed.
 */
type HintFn = (md: string) => boolean;

/**
 * Returns the lexed token and the remainder of the markdown. Should return null if
 * the markdown could not be lexed.
 */
type LexerFn = (md: string) => [token: Token, remainder: string] | null;

interface Lexer {
  hint: HintFn;
  lex: LexerFn;
}

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
