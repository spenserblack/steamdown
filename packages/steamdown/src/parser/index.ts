import BlockToken from "./block-token";
import Heading from "./heading";

export { BlockToken, Heading };

BlockToken.useRule("heading", Heading.rule, Heading.parse, 0);

/**
 * Renders the given Markdown string to Steam's text format.
 */
export default class Lexer {
  public constructor(private text: string) {}

  public hasNext(): boolean {
    return !!this.text.length;
  }

  public next(): BlockToken {
    const [token, rest] = BlockToken.parse(this.text);
    this.text = rest;
    return token;
  }

  public lexAll(): BlockToken[] {
    const tokens: BlockToken[] = [];
    while (this.hasNext()) {
      tokens.push(this.next());
    }
    return tokens;
  }
}
