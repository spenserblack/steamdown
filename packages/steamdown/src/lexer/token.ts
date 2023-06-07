export default abstract class Token {
  public readonly abstract scope: 'inline' | 'block';

  constructor(public readonly literal: string) {}

  toString(): string {
    return this.literal;
  }
}
