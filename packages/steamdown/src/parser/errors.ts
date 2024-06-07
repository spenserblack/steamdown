export class ParseError extends Error {}

export class UnreachableError extends Error {
  constructor() {
    super('Unreachable');
  }
}

export class ImproperlyConfiguredError extends Error {
  constructor(message?: string) {
    super(message ?? 'Improperly configured');
  }
}
