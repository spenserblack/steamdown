export const text = Symbol("text");

export interface Text {
  type: typeof text;
  text: string;
}

export type Node = Text;
