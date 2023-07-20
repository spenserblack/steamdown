import InlineContainerToken from "./inline-container-token";
import InlineToken from "./inline-token";
import InlineText from "./inline-text";
import ParseError from "./parse-error";

export default class InlineNoparse extends InlineContainerToken {
  public static readonly rule = /\{\{\{((?:[^{}\n](?!\n)|\n(?!\n))+?)\}\}\}/;
  public readonly tag = "noparse";
  public readonly tokens: InlineToken[];

  private constructor(public readonly raw: string, public readonly content: string) {
    super();
    this.tokens = [new InlineText(content)];
  }

  public static parse(text: string): [token: InlineNoparse, rest: string] {
    const match = text.match(InlineNoparse.rule);
    if (!match) {
      throw new ParseError(`Could not parse ${text}`);
    }
    const [raw, content] = match;
    return [new InlineNoparse(raw, content), text.slice(raw.length)];
  }

  public getTag(): string {
    return this.tag;
  }
}
