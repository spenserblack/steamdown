import InlineToken from "./inline-token";
import TaggedInlineToken from "./tagged-inline-token";

export default class Spoiler extends TaggedInlineToken {
  public readonly tag = "spoiler";
  public readonly tokens: InlineToken[];

  private constructor(public readonly text: string, literal: string) {
    super(literal);
    this.tokens = InlineToken.lexTokens(text);
  }

  public static hint(md: string): boolean {
    return md.startsWith("!!!");
  }

  public static lex(md: string): [token: Spoiler, remainder: string] | null {
    const scan = InlineToken.scan(md.slice(3), "\\!\\!\\!");
    if (!scan) {
      return null;
    }

    const [index, text] = scan;
    // NOTE Off by 3 because scan starts at index 3, regex index
    //      is the start of the match (so the first valid character before
    //      the delimiter), and 3 more to account for the delimiter itself.
    const literal = md.slice(0, index + 7);
    const remainder = md.slice(index + 7);
    return [new Spoiler(text, literal), remainder];
  }
}
