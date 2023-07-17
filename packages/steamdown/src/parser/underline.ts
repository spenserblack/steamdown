import InlineToken from "./inline-token";
import InlineContainerToken from "./inline-container-token";
import ParseError from "./parse-error";

export default class Underline extends InlineContainerToken {
  public static rule = /__((?!\s)(?:.(?!\n)|\n(?!\n))+?)(?<!\s)__(?!_)/;
  public readonly tag = "u";
  private constructor(
    public readonly raw: string,
    public readonly content: string,
    public readonly tokens: InlineToken[],
  ) {
    super();
  }

  public static parse(text: string): [token: Underline, rest: string] {
    const match = text.match(Underline.rule);
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
    return [new Underline(raw, content, tokens), text.slice(raw.length)];
  }

  public getTag(): string {
    return this.tag;
  }
}
