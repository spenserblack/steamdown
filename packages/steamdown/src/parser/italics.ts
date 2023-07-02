import InlineContainerToken from "./inline-container-token";
import InlineToken from "./inline-token";
import ParseError from "./parse-error";

export default class Italics extends InlineContainerToken {
  public static rule = /(\*|_)((?!\s)(?:.(?!\n)|\n(?!\n))+?)(?<!\s)\1/;
  public readonly tag = "i";

  private constructor(public readonly raw: string, public readonly content: string, public readonly tokens: InlineToken[]) {
    super();
  }

  public static parse(text: string): [token: Italics, rest: string] {
    const match = text.match(Italics.rule);
    if (!match) {
      throw new ParseError(`Could not parse ${text}`);
    }
    const [raw, , content] = match;
    let textContent = content;
    const tokens: InlineToken[] = [];
    while (textContent !== "") {
      const [token, rest] = InlineToken.parse(textContent);
      tokens.push(token);
      textContent = rest;
    }
    return [new Italics(raw, content, tokens), text.slice(raw.length)];
  }

  public getTag(): string {
    return this.tag;
  }
}
