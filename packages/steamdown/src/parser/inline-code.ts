import InlineToken from "./inline-token";
import InlineNoparse from "./inline-noparse";
import ParseError from "./parse-error";

export default class InlineCode extends InlineToken {
  public static readonly rule = /(`+)((?:[^`\n](?!\n)|\n(?!\n))+?)\1/;
  public static readonly tags = ["code", "noparse"] as const;

  private constructor(public readonly raw: string, public readonly content: string) {
    super();
  }

  public static parse(text: string): [token: InlineCode, rest: string] {
    const match = text.match(InlineCode.rule);
    if (!match) {
      throw new ParseError(`Could not parse ${text}`);
    }
    const [raw, , content] = match;
    return [new InlineCode(raw, content), text.slice(raw.length)];
  }

  public render(): string {
    const [outer, inner] = InlineCode.tags;
    return `[${outer}][${inner}]${this.content}[/${inner}][/${outer}]`;
  }
}
