export class ParseError extends Error {}

export class UnreachableError extends Error {
  constructor(msg?: string) {
    super(msg ?? "Unreachable");
  }
}
