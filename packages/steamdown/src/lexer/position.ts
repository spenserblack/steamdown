export type Position = Readonly<{ x: number; y: number }>;

export class PositionHelper {
  public x: number;
  public y: number;

  public constructor();
  public constructor(x: number, y: number);
  public constructor(x?: number, y?: number) {
    this.x = x ?? 0;
    this.y = y ?? 0;
  }

  public newline(): void {
    this.x = 0;
    this.y++;
  }

  public clone(): Position {
    return { x: this.x, y: this.y };
  }
}
