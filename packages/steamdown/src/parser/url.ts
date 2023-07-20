import InlineToken from "./inline-token";

// TODO
export default class Url extends InlineToken {
  public readonly raw: string = "";
  public readonly id: string = ""; // TODO Make [id] or [description][id]
  public readonly description: string = ""; // TODO make [description] or [id][description]
  public readonly url?: string; // TODO Make [id|description](href)

  // TODO update parent class to take a context?
  public override render(refs: Record<string, string | undefined> = {}): string {
    const url = this.url ?? refs[this.id];
    // TODO If url is undefined, wrap text in brackets instead of making a [url]
    return url ?? "";
  }
}
