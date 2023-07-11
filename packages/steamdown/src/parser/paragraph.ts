import BlockToken from "./block-token";
import InlineToken from "./inline-token";
import ParseError from "./parse-error";

export default class Paragraph extends BlockToken {
  // NOTE Any character goes, including single newlines, but not double newlines
  public static rule = /^(.+?)(?:\n\n|\n*$)/s;
  public readonly tokens: InlineToken[];

  private constructor(public readonly raw: string, public readonly content: string) {
    super();
    let text = this.content;
    const tokens: InlineToken[] = [];
    while (text !== "") {
      const [token, rest] = InlineToken.parse(text);
      tokens.push(token);
      text = rest;
    }
    this.tokens = tokens;
  }

  public static parse(text: string): [token: Paragraph, rest: string] {
    const match = text.match(Paragraph.rule);
    if (!match) {
      throw new ParseError(`Could not parse ${text}`);
    }
    const [raw, content] = match;
    return [new Paragraph(raw, content), text.slice(raw.length)];
  }

  public render(): string {
    // NOTE Adding trailing newlines to simulate a paragraph for Steam
    return `${this.tokens.map((token) => token.render()).join("")}\n\n`;
  }
}
