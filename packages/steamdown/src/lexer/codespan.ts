import InlineToken from "./inline-token";
import TaggedInlineToken from "./tagged-inline-token";

export default class Codespan extends TaggedInlineToken {
  public readonly tag = "code";
  public readonly tokens: InlineToken[];
  private constructor(public readonly text: string, literal: string) {
    super(literal);
    this.tokens = InlineToken.lexTokens(text);
  }

  public static hint(md: string): boolean {
    return md.startsWith("`");
  }

  public static lex(md: string): [token: Codespan, remainder: string] | null {
    const escapedDelim = "\\`";
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
    return [new Codespan(text, literal), remainder];
  }
}
