export default abstract class Token {
  // HACK There are no abstract static properties in TypeScript
  // NOTE This always fails to match
  protected static readonly rule: RegExp = /(?!)/;

  public abstract readonly raw: string;

  public abstract render(): string;
}
