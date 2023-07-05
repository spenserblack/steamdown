import ParseError from "./parse-error";
import Token from "./token";

export type InlineTokenParser = (text: string) => [token: InlineToken, rest: string];
export type Rule = [rule: RegExp, parser: InlineTokenParser, priority: number];

export default abstract class InlineToken extends Token {
  private static _rules: Record<string, Rule> = {};
  private static _sorted: Rule[] = [];

  public static getRules(): Record<string, Rule> {
    return this._rules;
  }

  public static useRule(
    name: string,
    rule: RegExp,
    parser: InlineTokenParser,
    priority: number,
  ): void {
    if (this._rules[name]) {
      throw new Error(`Rule ${name} already exists`);
    }
    this._rules[name] = [rule, parser, priority];
    this.setRules(this._rules);
  }

  public static parse(text: string): [token: InlineToken, rest: string] {
    const rule = this._sorted.find(([rule]) => {
      const regex = new RegExp(`^${rule.source}`);
      return regex.test(text);
    });
    if (!rule) {
      throw new ParseError(`Could not parse ${text}`);
    }
    const [, parser] = rule;
    return parser(text);
  }

  private static setRules(rules: Record<string, Rule>) {
    this._rules = rules;
    this._sorted = Object.values(rules).sort(
      ([, , priority1], [, , priority2]) => priority1 - priority2,
    );
  }
}
