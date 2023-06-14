import Token from "./token";

/**
 * Scans the given string for inline tokens for the given character.
 *
 * @param md The string to scan.
 * @param char The character to scan for. Note that this must be escaped if it
 * is a special character in a regex.
 *
 * @returns The index and string sliced at the index if it is valid, or null if it is not.
 */
function scanInline(md: string, char: string): [index: number, slice: string] | null {
  // NOTE: Cannot be preceded by a backslash (means the character is escaped)
  //       or whitespace.
  const re = new RegExp(`[^\\\\\\s]${char}(?=\\s|$)`);
  const index = md.match(re)?.index;
  if (index == null) {
    return null;
  }
  const slice = md.slice(0, index + 1);
  // NOTE: Invalid if it contains an empty line.
  if (/\n\n/.test(slice)) {
    return null;
  }
  return [index, slice];
}

export abstract class InlineToken extends Token {
  public readonly scope = "inline";
}

export class Italic extends InlineToken {
  public readonly tokens: InlineToken[];
  private constructor(public readonly text: string, literal: string) {
    super(literal);
    this.tokens = lexInline(text);
  }

  static hint(md: string): boolean {
    return md.startsWith("*") || md.startsWith("_");
  }

  static lex(md: string): [token: Italic, remainder: string] | null {
    const delim = md[0] as "*" | "_";
    const escapedDelim = `\\${delim}`;
    const scan = scanInline(md.slice(1), escapedDelim);
    if (!scan) {
      return null;
    }
    const [index, text] = scan;
    // NOTE: Off by 1 because scan starts at index 1, regex index
    //       is the start of the match (so the first valid character before
    //       the delimiter), and 1 more to account for the delimiter itself.
    const literal = md.slice(0, index + 3);
    const remainder = md.slice(index + 3);
    return [new Italic(text, literal), remainder];
  }
}

export class Bold extends InlineToken {
  public readonly tokens: InlineToken[];

  private constructor(public readonly text: string, literal: string) {
    super(literal);
    this.tokens = lexInline(text);
  }

  static hint(md: string): boolean {
    return md.startsWith("**");
  }

  static lex(md: string): [token: Bold, remainder: string] | null {
    const scan = scanInline(md.slice(2), "\\*\\*");
    if (!scan) {
      return null;
    }
    const [index, text] = scan;
    // NOTE: Off by 2 because scan starts at index 2, regex index
    //      is the start of the match (so the first valid character before
    //      the delimiter), and 2 more to account for the delimiter itself.
    const literal = md.slice(0, index + 5);
    const remainder = md.slice(index + 5);
    return [new Bold(text, literal), remainder];
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
