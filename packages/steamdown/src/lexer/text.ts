import InlineToken from './inline-token';

/**
 * A text token.
 *
 * Always is plain text containing no styling.
 */
export default class Text extends InlineToken {
  private constructor(public readonly content: string) {
    super(content);
  }

  static hint(md: string): boolean {
    return md !== '';
  }

  static lex(md: string): [token: Text, remainder: string] {
    return [new Text(md), ''];
  }
}
