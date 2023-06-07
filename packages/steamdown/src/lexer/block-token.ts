import Token from "./token";

export default abstract class BlockToken extends Token {
  public readonly scope = "block";
}
