import Bold from "./bold";
import Codespan from "./codespan";
import Heading from "./heading";
import InlineToken from "./inline-token";
import Italic from "./italic";
import { LexError } from "./errors";
import type { Lexer } from "./token";
import Spoiler from "./spoiler";
import Strikethrough from "./strikethrough";
import Text from "./text";
import Token from "./token";
import Underline from "./underline";

[Spoiler, Bold, Underline, Strikethrough, Italic, Codespan, Text].forEach(
  (token, index) => {
    InlineToken.use(token, index);
  },
);

export {
  Bold,
  Codespan,
  Heading,
  Italic,
  LexError,
  Spoiler,
  Strikethrough,
  Text,
  Token,
  Underline,
};

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
