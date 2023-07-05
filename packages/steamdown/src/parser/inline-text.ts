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
    const inlineRules = InlineToken.getRules();
    const match = text.match(InlineText.rule);
    if (!match) {
      throw new ParseError(`Could not parse ${text}`);
    }
    const [allText] = match;

    // NOTE Text should only parse until the next matching rule
    // HACK Obviously, this excludes the text rule itself
    const allRules = new RegExp(Object.entries(inlineRules).filter(([name]) => name !== "text").map(([, [rule]]) => rule.source).join("|"));
    const untilIndex = allRules.exec(allText)?.index ?? allText.length;
    const raw = allText.slice(0, untilIndex);

    return [new InlineText(raw), text.slice(raw.length)];
  }

  public render(): string {
    return this.content;
  }
}
