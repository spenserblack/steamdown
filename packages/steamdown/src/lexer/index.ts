import Bold from "./bold";
import Heading from "./heading";
import InlineToken from "./inline-token";
import Italic from "./italic";
import { LexError } from "./errors";
import type { Lexer } from "./token";
import Text from "./text";
import Token from "./token";

[Bold, Italic, Text].forEach((token, index) => {
  InlineToken.use(token, index);
});

export { Bold, Heading, Italic, LexError, Text, Token };

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
  const tokens: Token[] = [];
  let toLex: string = md;
  while (toLex.trimEnd() !== "") {
    const [token, remainder] = reduceLexers(toLex);
    tokens.push(token);
    toLex = remainder;
  }
  return tokens;
}
