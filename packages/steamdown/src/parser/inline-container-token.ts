import InlineToken from "./inline-token";

/**
 * An inline token that contains other inline tokens.
 */
export default abstract class InlineContainerToken extends InlineToken {
  public abstract readonly tokens: InlineToken[];
  public abstract getTag(): string;

  public render(): string {
    const tag = this.getTag();
    return `[${tag}]${this.tokens.map((token) => token.render()).join("")}[/${tag}]`;
  }
}
