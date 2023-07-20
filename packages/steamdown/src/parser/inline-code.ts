import InlineContainerToken from "./inline-container-token";
import InlineToken from "./inline-token";
import InlineText from "./inline-text";

export default class InlineCode extends InlineContainerToken {
  public static readonly rule = /(`+)((?:[^`\n](?!\n)|\n(?!\n))+?)\1/;
  public readonly tag = "code";
  public readonly tokens: InlineToken[];

  private constructor(public readonly raw: string, public readonly content: string) {
    super();
    this.tokens = [new InlineText(content)];
  }

  public static parse(text: string): [token: InlineCode, rest: string] {
    const match = text.match(InlineCode.rule);
    if (!match) {
      throw new Error(`Could not parse ${text}`);
    }
    const [raw, , content] = match;
    return [new InlineCode(raw, content), text.slice(raw.length)];
  }

  public getTag(): string {
    return this.tag;
  }
}
