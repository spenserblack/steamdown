import InlineToken from "./inline-token";
import ParseError from "./parse-error";

interface UrlMatch {
  groups: {
    text: string;
    url?: string;
    id?: string;
  };
}

// TODO
export default class Url extends InlineToken {
  public static rule = /\!?\[(?<text>[^\n]+?)\](?:(?:\((?<url>[^\n]+?)\))|(?:\[(?<id>[^\n]+?)\]))?/;
  public readonly id: string;
  public readonly description: string;
  public readonly url?: string;

  private constructor(public readonly raw: string, { groups: { text, id, url } }: RegExpMatchArray & UrlMatch) {
    super();
    this.description = text;
    this.id = id ?? text;
    this.url = url;
  }

  // TODO update parent class to take a context?
  public override render(refs: Record<string, string | undefined> = {}): string {
    const url = this.url ?? refs[this.id];
    // HACK If the URL is nullish, return the raw text. I.e. it's not a URL, but text.
    if (url == null) {
      return this.raw;
    }
    return `[url=${url}]${this.description}[/url]`;
  }

  public static parse(text: string): [token: Url, rest: string] {
    const match = text.match(Url.rule) as (RegExpMatchArray & UrlMatch) | null;
    if (!match) {
      throw new ParseError(`Could not parse ${text}`);
    }
    const [raw] = match;
    const url = new Url(raw, match);
    return [url, text.slice(raw.length)];
  }
}
