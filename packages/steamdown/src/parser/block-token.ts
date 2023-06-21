import type InlineToken from "./inline-token";
import ParseError from "./parse-error";
import Token from "./token";

export type BlockTokenParser = (text: string) => [token: BlockToken, rest: string];
export type Rule = [rule: RegExp, parser: BlockTokenParser, priority: number];

export default abstract class BlockToken extends Token {
  private static _rules: Record<string, Rule> = {};
  private static _sorted: Rule[] = [];
  public abstract tokens: InlineToken[];

  public static useRule(
    name: string,
    rule: RegExp,
    parser: BlockTokenParser,
    priority: number,
  ): void {
    if (this._rules[name]) {
      throw new Error(`Rule ${name} already exists`);
    }
    this._rules[name] = [rule, parser, priority];
    this.setRules(this._rules);
  }

  public static parse(text: string): [token: BlockToken, rest: string] {
    const rule = this._sorted.find(([rule]) => rule.test(text));
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
