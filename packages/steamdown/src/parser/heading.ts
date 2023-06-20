import BlockToken from "./block-token";
import ParseError from "./parse-error";

export default class Heading extends BlockToken {
  public static rule = /^(#{1,6}) ([^\n]+)(?:\n|$)/;

  private constructor(public readonly raw: string, public readonly level: number, public readonly content: string) {
    super();
  }

  public static parse(text: string): [token: Heading, rest: string] {
    const match = text.match(Heading.rule);
    if (!match) {
      throw new ParseError(`Could not parse ${text}`);
    }
    const [raw, hashes, content] = match;
    return [new Heading(raw, hashes.length, content), text.slice(raw.length)];
  }

  public render(): string {
    const tag = this.tag();
    return `[${tag}]${this.content}[/${tag}]`;
  }

  private tag(): string {
    return `h${this.level}`;
  }
}
