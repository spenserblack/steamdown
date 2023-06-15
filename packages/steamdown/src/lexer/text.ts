import InlineToken from "./inline-token";
/**
 * A text token.
 *
 * Always is plain text containing no styling.
 */
export default class Text extends InlineToken {
  private constructor(public readonly content: string) {
    super(content);
  }

  public static hint(md: string): boolean {
    return md !== "";
  }

  public static lex(md: string): [token: Text, remainder: string] {
    return [new Text(md), ""];
  }

  public override render(): string {
    return InlineToken.escapes.reduce(
      (str, escape) => str.replace(escape, "$1"),
      this.content,
    );
  }
}
