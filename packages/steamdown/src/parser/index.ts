import BlockToken from "./block-token";
import Heading from "./heading";
import Paragraph from "./paragraph";
import InlineToken from "./inline-token";
import Bold from "./bold";
import Italics from "./italics";
import InlineText from "./inline-text";

export { BlockToken, InlineToken, Heading, Paragraph, Bold, Italics, InlineText };

BlockToken.useRule("heading", Heading.rule, Heading.parse, 10);
BlockToken.useRule("paragraph", Paragraph.rule, Paragraph.parse, 1000);

InlineToken.useRule("bold", Bold.rule, Bold.parse, 10);
InlineToken.useRule("italics", Italics.rule, Italics.parse, 20);
// NOTE Text should always be prioritized last
InlineToken.useRule("text", InlineText.rule, InlineText.parse, Infinity);

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
