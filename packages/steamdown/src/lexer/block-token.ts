import type InlineToken from "./inline-token";
import Token from "./token";

export type BlockTokenConstructor = (text: string) => BlockToken;

export default abstract class BlockToken extends Token {
  private static orderedRules: [order: number, rule: RegExp, constructor: BlockTokenConstructor][] = [];
  private static _rules: RegExp[] = [];
  public abstract readonly tokens: InlineToken[];
  public static get rules(): RegExp[] {
    return this._rules;
  }
  public static set rules(rules: RegExp[]) {
    this._rules = rules;
  }

  public static useRule(rule: RegExp, constructor: BlockTokenConstructor, priority: number): void {
    this.orderedRules.push([priority, rule, constructor]);
    const rules = this.orderedRules.sort(([a], [b]) => a - b).map(([, rule]) => rule);
    this.rules = rules;
  }
}
