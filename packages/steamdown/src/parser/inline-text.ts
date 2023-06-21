import InlineToken from "./inline-token";
import ParseError from "./parse-error";

export default class InlineText extends InlineToken {
  public static rule = /(?!\n)(?:.|\n(?!\n))+/;
  public content: string;

  private constructor(public readonly raw: string) {
    super();
    this.content = raw;
  }

  public static parse(text: string): [token: InlineText, rest: string] {
    const match = text.match(InlineText.rule);
    if (!match) {
      throw new ParseError(`Could not parse ${text}`);
    }
    const [raw] = match;
    return [new InlineText(raw), text.slice(raw.length)];
  }

  public render(): string {
    return this.content;
  }
}
