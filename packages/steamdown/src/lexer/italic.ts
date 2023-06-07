import InlineToken from "./inline-token";

export default class Italic extends InlineToken {
  private static readonly regexes = ["\\*", "_"].map(
    (delim) => new RegExp(`${delim}([^\n]+?(?:\n[^\n]+?)*)${delim}(?=\\s|$)`),
  );
  private constructor(public readonly text: string, literal: string) {
    super(literal);
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
