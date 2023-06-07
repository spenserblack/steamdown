import Token from "./token";

export default abstract class InlineToken extends Token {
  public readonly scope = "inline";
}
