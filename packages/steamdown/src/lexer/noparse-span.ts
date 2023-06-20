import InlineToken from "./inline-token";
import TaggedInlineToken from "./tagged-inline-token";

export default class NoparseSpan extends TaggedInlineToken {
  public readonly tag = "noparse";
  public readonly tokens: InlineToken[];

  private constructor(public readonly text: string, literal: string) {
    super(literal);
    // HACK Instead of using tokens, we just use the text as-is.
    this.tokens = [];
  }

  public static hint(md: string): boolean {
    return md.startsWith("{{{");
  }

  public static lex(md: string): [token: NoparseSpan, remainder: string] | null {
    const scan = InlineToken.scan(md.slice(3), "\\}\\}\\}");
    if (!scan) {
      return null;
    }
    const [index, text] = scan;
    // NOTE Off by 3 because scan starts at index 3, regex index
    //      is the start of the match (so the first valid character before
    //      the delimiter), and 3 more to account for the delimiter itself.
    const literal = md.slice(0, index + 7);
    const remainder = md.slice(index + 7);
    return [new NoparseSpan(text, literal), remainder];
  }

  public override render(): string {
    return this.text;
  }
}
