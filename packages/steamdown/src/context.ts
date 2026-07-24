/**
 * Context (items that aren't rendered and shouldn't be part of the syntax tree).
 */
export class Context {
  private links = new Map<string, string>();

  public addLink(id: string, url: string): void {
    this.links.set(id, url);
  }

  public getLink(id: string): string | undefined {
    return this.links.get(id);
  }
}
