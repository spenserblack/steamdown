import BlockToken from "./block-token";
import Heading from "./heading";
import Paragraph from "./paragraph";
import InlineToken from "./inline-token";
import InlineNoparse from "./inline-noparse";
import InlineCode from "./inline-code";
import Bold from "./bold";
import Underline from "./underline";
import Italics from "./italics";
import InlineText from "./inline-text";

export { BlockToken, InlineToken, Heading, Paragraph, InlineNoparse, InlineCode, Bold, Underline, Italics, InlineText };

BlockToken.useRule("heading", Heading.rule, Heading.parse, 10);
BlockToken.useRule("paragraph", Paragraph.rule, Paragraph.parse, 1000);

InlineToken.useRule("noparse", InlineNoparse.rule, InlineNoparse.parse, 10);
InlineToken.useRule("inline-code", InlineCode.rule, InlineCode.parse, 20);
InlineToken.useRule("bold", Bold.rule, Bold.parse, 30);
InlineToken.useRule("underline", Underline.rule, Underline.parse, 40);
InlineToken.useRule("italics", Italics.rule, Italics.parse, 50);
// NOTE Text should always be prioritized last
InlineToken.useRule("text", InlineText.rule, InlineText.parse, Infinity);

/**
 * Renders the given Markdown string to Steam's text format.
 */
export default class Parser {
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
