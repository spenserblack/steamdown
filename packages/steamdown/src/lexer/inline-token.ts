import ParseError from "./parse-error";
import Token from "./token";

export type InlineTokenConstructor = (text: string) => InlineToken;

export default abstract class InlineToken extends Token {
  private static orderedRules: [order: number, rule: RegExp, constructor: InlineTokenConstructor][] = [];
  private static _rules: RegExp[] = [];
  public abstract readonly tokens: InlineToken[];
  public static get rules(): RegExp[] {
    return this._rules;
  }
  public static set rules(rules: RegExp[]) {
    this._rules = rules;
  }

  public static useRule(rule: RegExp, constructor: InlineTokenConstructor, priority: number): void {
    this.orderedRules.push([priority, rule, constructor]);
    const rules = this.orderedRules.sort(([a], [b]) => a - b).map(([, rule]) => rule);
    this.rules = rules;
  }

  public static parse(text: string): InlineToken[] {
    const rule = this.rules.find((rule) => rule.test(text));
    if (!rule) {
      throw new ParseError(`No rule found for text "${text}"`);
    }
    const [, , constructor] = this.orderedRules.find(([, rule]) => rule === rule)!;
    const token = constructor(text);
    return [token];
  }
}
