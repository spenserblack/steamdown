/**
 * A node in the syntax tree.
 */
export interface Node {
  type: string;
  nodes?: Node[];
}

/**
 * Root node. All nodes should be children of this node.
 */
export interface Root extends Node {
  type: "root";
  nodes: Node[];
}

/**
 * A paragraph node.
 */
export interface Paragraph extends Node {
  type: "paragraph";
  nodes: Inline[];
}

/**
 * A noparse span node.
 */
export interface NoparseSpan extends Node {
  type: "noparse-span";
  text: string;
}

/**
 * A bold node.
 */
export interface Bold extends Node {
  type: "bold";
  nodes: Inline[];
}

/**
 * An italics node.
 */
export interface Italics extends Node {
  type: "italics";
  nodes: Inline[];
}

/**
 * A bold + italics node.
 */
export interface BoldItalics extends Node {
  type: "bold-italics";
  nodes: Inline[];
}

/**
 * An underline node.
 */
export interface Underline extends Node {
  type: "underline";
  nodes: Inline[];
}

/**
 * A strike node.
 */
export interface Strike extends Node {
  type: "strike";
  nodes: Inline[];
}

/**
 * A text node.
 */
export interface Text extends Node {
  type: "text";
  text: string;
}

/**
 * An escaped character node.
 */
export interface Escaped extends Node {
  type: "escaped";
  character: string;
}

export type Inline =
  | NoparseSpan
  | BoldItalics
  | Bold
  | Italics
  | Underline
  | Strike
  | Text
  | Escaped;
export type Block = Paragraph;
