import InlineToken from "./inline-token";
import TaggedInlineToken from "./tagged-inline-token";

export default class Italic extends TaggedInlineToken {
  public readonly tag = "i";
  public readonly tokens: InlineToken[];
  private constructor(public readonly text: string, literal: string) {
    super(literal);
    this.tokens = InlineToken.lexTokens(text);
  }

  public static hint(md: string): boolean {
    return md.startsWith("*") || md.startsWith("_");
  }

  public static lex(md: string): [token: Italic, remainder: string] | null {
    const delim = md[0] as "_" | "*";
    const escapedDelim = `\\${delim}`;
    const scan = InlineToken.scan(md.slice(1), escapedDelim);
    if (!scan) {
      return null;
    }
    const [index, text] = scan;
    // NOTE Off by 1 because scan starts at index 1, regex index
    //       is the start of the match (so the first valid character before
    //       the delimiter), and 1 more to account for the delimiter itself.
    const literal = md.slice(0, index + 3);
    const remainder = md.slice(index + 3);
    return [new Italic(text, literal), remainder];
  }
}
