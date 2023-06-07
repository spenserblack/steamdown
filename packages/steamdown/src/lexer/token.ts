// NOTE: In lieu of static abstract methods, we export these types
/**
 * Returns true if the Markdown should likely be lexed.
 */
export type HintFn = (md: string) => boolean;

/**
 * Returns the lexed token and the remainder of the markdown. Should return null if
 * the markdown could not be lexed.
 */
export type LexerFn = (md: string) => [token: Token, remainder: string] | null;

export interface Lexer {
  hint: HintFn;
  lex: LexerFn;
}

export default abstract class Token {
  public abstract readonly scope: "inline" | "block";

  constructor(public readonly literal: string) {}

  toString(): string {
    return this.literal;
  }
}
