import InlineContainerToken from "./inline-container-token";
import InlineToken from "./inline-token";
import InlineText from "./inline-text";
import ParseError from "./parse-error";

export default class InlineSpoiler extends InlineContainerToken {
  public static readonly rule = /\!\!\!((?:[^\!\n](?!\n)|\n(?!\n))+?)\!\!\!/;
  public readonly tag = "spoiler";

  private constructor(public readonly raw: string, public readonly content: string, public readonly tokens: InlineToken[]) {
    super();
  }

  public static parse(text: string): [token: InlineSpoiler, rest: string] {
    const match = text.match(InlineSpoiler.rule);
    if (!match) {
      throw new ParseError(`Could not parse ${text}`);
    }
    const [raw, content] = match;
    let textContent = content;
    const tokens: InlineToken[] = [];
    while (textContent !== "") {
      const [token, rest] = InlineToken.parse(textContent);
      tokens.push(token);
      textContent = rest;
    }
    return [new InlineSpoiler(raw, content, tokens), text.slice(raw.length)];
  }

  public getTag(): string {
    return this.tag;
  }
}
