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
  type: 'root';
  nodes: Node[];
}

/**
 * A paragraph node.
 */
export interface Paragraph extends Node {
  type: 'paragraph';
  nodes: InlineNode[];
}

/**
 * A text node.
 */
export interface Text extends Node {
  type: 'text';
  text: string;
}

export type InlineNode = Text;
