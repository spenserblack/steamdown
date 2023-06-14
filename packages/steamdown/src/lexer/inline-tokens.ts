import Token from "./token";

export abstract class InlineToken extends Token {
  public readonly scope = "inline";
}

export class Italic extends InlineToken {
  public readonly tokens: InlineToken[];
  private static readonly regexes = ["\\*", "_"].map(
    // TODO: Handle escaped delimiters.
    (delim) => new RegExp(`^${delim}((?:[^\n])+?(?:\n[^\n]+?)*)${delim}(?=\\s|$)`),
  );

  private constructor(public readonly text: string, literal: string) {
    super(literal);
    this.tokens = lexInline(text);
  }

  static hint(md: string): boolean {
    return md.startsWith("*") || md.startsWith("_");
  }

  static lex(md: string): [token: Italic, remainder: string] | null {
    const match = Italic.regexes
      .map((regex) => md.match(regex))
      .find((match) => match !== null);
    if (!match) {
      return null;
    }
    const [literal, text] = match;
    // NOTE: If the text ends in whitespace, it is not italicized.
    // TODO: Put this in the regex?
    if (/\s$/.test(text)) {
      return null;
    }
    return [new Italic(text, literal), md.slice(literal.length)];
  }
}

export class Bold extends InlineToken {
  public readonly tokens: InlineToken[];
  private static readonly regex = /^\*\*((?:[^\n])+?(?:\n[^\n]+?)*)\*\*(?=\s|$)/;

  private constructor(public readonly text: string, literal: string) {
    super(literal);
    this.tokens = lexInline(text);
  }

  static hint(md: string): boolean {
    return md.startsWith("**");
  }

  static lex(md: string): [token: Bold, remainder: string] | null {
    const match = md.match(Bold.regex);
    if (!match) {
      return null;
    }
    const [literal, text] = match;
    // NOTE: If the text ends in whitespace, it is not bold.
    // TODO: Put this in the regex?
    if (/\s$/.test(text)) {
      return null;
    }
    return [new Bold(text, literal), md.slice(literal.length)];
  }
}

/**
 * A text token.
 *
 * Always is plain text containing no styling.
 */
export class Text extends InlineToken {
  private constructor(public readonly content: string) {
    super(content);
  }

  static hint(md: string): boolean {
    return md !== "";
  }

  static lex(md: string): [token: Text, remainder: string] {
    return [new Text(md), ""];
  }
}

const tokenTypes = [Bold, Italic, Text];

function lexToken(md: string): [token: InlineToken, remainder: string] {
  const hinted = tokenTypes.filter((t) => t.hint(md));
  for (let i = 0; i < hinted.length; ++i) {
    const lexer = hinted[i];
    const lexed = lexer.lex(md);
    if (lexed) {
      return lexed;
    }
  }
  // NOTE: Text should always be lexed if nothing else matches.
  throw new Error("Unreachable");
}

export function lexInline(md: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let toLex: string = md;
  while (toLex !== "") {
    const [token, remainder] = lexToken(toLex);
    tokens.push(token);
    toLex = remainder;
  }
  return tokens;
}
