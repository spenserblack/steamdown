import Token from "./token";

// HACK: In lieu of static abstract methods, we export this type
export interface Lexable {
  /**
   * Returns if the given string is *likely* to be lexed. For example, a string that
   * starts with `**` is likely to be lexed as bold.
   */
  hint(md: string): boolean;
  /**
   * Lexes the given string into a token and the remainder of the string. Should return
   * null if the string could not be lexed.
   */
  lex(md: string): [token: InlineToken, remainder: string] | null;
}

export default abstract class InlineToken extends Token {
  /**
   * Lists the characters that can be escaped in inline tokens.
   */
  protected static readonly escapes = [/\\(\\)/g, /\\(\*)/g, /\\(_)/g];
  private static types: Lexable[] = [];
  public readonly scope = "inline";

  /**
   * Register a token type to be lexed.
   * @param token The token type to register.
   * @param order The order to lex the token type in. Lower numbers are lexed first.
   */
  public static use(token: Lexable, order: number): void {
    InlineToken.types.splice(order, 0, token);
  }

  /**
   * Scans the given string for inline tokens for the given character.
   *
   * @param md The string to scan.
   * @param char The character to scan for. Note that this must be escaped if it
   * is a special character in a regex.
   *
   * @returns The index and string sliced at the index if it is valid, or null if it is not.
   */
  protected static scan(
    md: string,
    char: string,
  ): [index: number, slice: string] | null {
    // NOTE Cannot be preceded by a backslash (means the character is escaped)
    //       or whitespace.
    const re = new RegExp(`[^\\\\\\s]${char}(?=\\s|$)`);
    const index = md.match(re)?.index;
    if (index == null) {
      return null;
    }
    const slice = md.slice(0, index + 1);
    // NOTE Invalid if it contains an empty line.
    if (/\n\n/.test(slice)) {
      return null;
    }
    return [index, slice];
  }

  protected static lexTokens(md: string): InlineToken[] {
    const tokens: InlineToken[] = [];
    let toLex: string = md;
    while (toLex !== "") {
      const [token, remainder] = InlineToken.lexToken(toLex);
      tokens.push(token);
      toLex = remainder;
    }
    return tokens;
  }

  private static lexToken(md: string): [token: InlineToken, remainder: string] {
    const hinted = InlineToken.types.filter((t) => t.hint(md));
    for (let i = 0; i < hinted.length; ++i) {
      const lexer = hinted[i];
      const lexed = lexer.lex(md);
      if (lexed) {
        return lexed;
      }
    }
    // NOTE Text should always be lexed if nothing else matches.
    throw new Error("Unreachable");
  }
}
