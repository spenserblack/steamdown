export default abstract class Token {
  public abstract readonly scope: "inline" | "block";

  constructor(public readonly literal: string) {}

  toString(): string {
    return this.literal;
  }
}
