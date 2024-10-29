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

/** A noparse block node. */
export interface NoparseBlock extends Node {
  type: "noparse-block";
  text: string;
}

/**
 * A code block node.
 */
export interface CodeBlock extends Node {
  type: "code-block";
  text: string;
}

/**
 * A header node.
 */
export interface Header extends Node {
  type: "header";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  nodes: Inline[];
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
 * A spoiler node.
 */
export interface Spoiler extends Node {
  type: "spoiler";
  nodes: Inline[];
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
  | Spoiler
  | BoldItalics
  | Bold
  | Italics
  | Underline
  | Strike
  | Text
  | Escaped;
export type Block = NoparseBlock | CodeBlock | Header | Paragraph;
