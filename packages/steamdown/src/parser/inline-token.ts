import ParseError from "./parse-error";
import Token from "./token";

export type InlineTokenConstructor = (text: string) => InlineToken;

export default abstract class InlineToken extends Token {}
