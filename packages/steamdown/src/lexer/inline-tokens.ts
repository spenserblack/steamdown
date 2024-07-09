export const asterisk = Symbol("*");
export const underscore = Symbol("_");
export const tilde = Symbol("~");
export const text = Symbol("text");
export const escape = Symbol("\\");
export const leftCurly = Symbol("{");
export const rightCurly = Symbol("}");
export const greaterThan = Symbol(">");
export const lessThan = Symbol("<");
export const exclamation = Symbol("!");
export const newline = Symbol("\n");

export type Token =
  | typeof asterisk
  | typeof underscore
  | typeof tilde
  | typeof text
  | typeof escape
  | typeof leftCurly
  | typeof rightCurly
  | typeof greaterThan
  | typeof lessThan
  | typeof exclamation
  | typeof newline;
