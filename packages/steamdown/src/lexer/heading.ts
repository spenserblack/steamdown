import BlockToken from "./block-token";

export default class Heading extends BlockToken {
  /**
   * Returns true if the Markdown should likely be lexed to this token.
   * @param md The Markdown source code
   */
  public static hint(md: string): boolean {
    return md.startsWith("#");
  }

  /**
   * Lexes the Markdown and returns the lexed token and the remainder of the markdown, or null
   * if it could not be lexed.
   */
  public static lex(md: string): [token: Heading, remainder: string] | null {
    const regex = /(#{1,6}) +[^\n]+/;
    const match = md.match(regex);
    if (!match) {
      return null;
    }
    const heading = match[1];
    return [new Heading(heading), md.slice(heading.length).trimStart()];
  }

  public level(): number {
    return this.literal.length;
  }

  public override render(): string {
    // TODO
    return "";
  }
}