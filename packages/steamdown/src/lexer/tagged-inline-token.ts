import InlineToken from "./inline-token";

export default abstract class TaggedInlineToken extends InlineToken {
  public abstract readonly tag: string;
  public abstract readonly tokens: InlineToken[];

  public override render(): string {
    return `[${this.tag}]${this.tokens.map((token) => token.render()).join("")}[/${
      this.tag
    }]`;
  }
}
