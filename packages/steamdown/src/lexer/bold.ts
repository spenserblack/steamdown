import InlineToken from "./inline-token";
import TaggedInlineToken from "./tagged-inline-token";

export default class Bold extends TaggedInlineToken {
  public readonly tag = "b";
  public readonly tokens: InlineToken[];

  private constructor(public readonly text: string, literal: string) {
    super(literal);
    this.tokens = InlineToken.lexTokens(text);
  }

  public static hint(md: string): boolean {
    return md.startsWith("**");
  }

  public static lex(md: string): [token: Bold, remainder: string] | null {
    const scan = InlineToken.scan(md.slice(2), "\\*\\*");
    if (!scan) {
      return null;
    }
    const [index, text] = scan;
    // NOTE Off by 2 because scan starts at index 2, regex index
    //      is the start of the match (so the first valid character before
    //      the delimiter), and 2 more to account for the delimiter itself.
    const literal = md.slice(0, index + 5);
    const remainder = md.slice(index + 5);
    return [new Bold(text, literal), remainder];
  }
}
