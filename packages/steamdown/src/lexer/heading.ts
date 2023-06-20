import BlockToken from "./block-token";
import type InlineToken from "./inline-token";

export default class Heading extends BlockToken {
  public static rule = /^(#{1,6}) ([^\n]+)$/;
  private constructor(public readonly raw: string, public readonly level: 1 | 2 | 3 | 4 | 5 | 6, public readonly tokens: InlineToken[]) {
    super();
  }

  public static parse(text: string): Heading {
    const match = text.match(Heading.rule);
    if (!match) {
      throw new Error("Invalid heading");
    }
    const [, level, content] = match;
    return new Heading(text, level.length as Heading["level"], InlineToken.parse(content));
  }

  public override render(): string {
    return `[h${this.level}]${this.tokens.map((token) => token.render()).join("")}[/h${this.level}]`;
  }
}
