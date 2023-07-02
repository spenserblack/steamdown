import InlineToken from "./inline-token";

/**
 * An inline token that contains other inline tokens.
 */
export default abstract class InlineContainerToken extends InlineToken {
  public abstract readonly tokens: InlineToken[];
  public abstract get tag(): string;

  public render(): string {
    return `[${this.tag}]${this.tokens.map((token) => token.render()).join("")}[/${this.tag}]`;
  }
}
