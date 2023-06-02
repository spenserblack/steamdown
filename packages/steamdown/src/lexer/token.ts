export default abstract class Token {
  constructor(public readonly literal: string) {}

  toString(): string {
    return this.literal;
  }
}
