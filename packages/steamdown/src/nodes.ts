/**
 * Base node type.
 */
export interface BaseNode {
  type: string;
  nodes?: Node[];
}

/**
 * Root node. All nodes should be children of this node.
 */
export interface Root extends BaseNode {
  type: "root";
  nodes: Block[];
}

/** A noparse block node. */
export interface NoparseBlock extends BaseNode {
  type: "noparse-block";
  text: string;
}

/**
 * A code block node.
 */
export interface CodeBlock extends BaseNode {
  type: "code-block";
  text: string;
}

/**
 * A heading node.
 */
export interface Heading extends BaseNode {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  nodes: Inline[];
}

/**
 * A reference matching an ID to a URL.
 *
 * Unlike most other nodes, this does *not* get rendered.
 */
export interface Reference extends BaseNode {
  type: "reference",
  id: string,
  url: string,
}

/**
 * A horizontal rule node.
 */
export interface HorizontalRule extends BaseNode {
  type: "horizontal-rule";
}

/**
 * A quote node.
 */
export interface Quote extends BaseNode {
  type: "quote";
  nodes: Block[];
  author?: [username: string, postId?: string];
}

/**
 * A paragraph node.
 */
export interface Paragraph extends BaseNode {
  type: "paragraph";
  nodes: Inline[];
}

/**
 * A noparse span node.
 */
export interface NoparseSpan extends BaseNode {
  type: "noparse-span";
  text: string;
}

/**
 * A url node in the format `[text](url)`.
 */
export interface LinkUrl extends BaseNode {
  type: "link-url";
  link: string;
  nodes: Inline[];
}

/**
 * A url in the format `[text][id]` or `[id]`.
 */
export interface IdUrl extends BaseNode {
  type: "id-url";
  id: string;
  nodes?: Inline[];
}

/**
 * A url node.
 */
export type Url = LinkUrl | IdUrl;

/**
 * A spoiler node.
 */
export interface Spoiler extends BaseNode {
  type: "spoiler";
  nodes: Inline[];
}

/**
 * A bold node.
 */
export interface Bold extends BaseNode {
  type: "bold";
  nodes: Inline[];
}

/**
 * An italics node.
 */
export interface Italics extends BaseNode {
  type: "italics";
  nodes: Inline[];
}

/**
 * A bold + italics node.
 */
export interface BoldItalics extends BaseNode {
  type: "bold-italics";
  nodes: Inline[];
}

/**
 * An underline node.
 */
export interface Underline extends BaseNode {
  type: "underline";
  nodes: Inline[];
}

/**
 * A strike node.
 */
export interface Strike extends BaseNode {
  type: "strike";
  nodes: Inline[];
}

/**
 * A text node.
 */
export interface Text extends BaseNode {
  type: "text";
  text: string;
}

/**
 * An escaped character node.
 */
export interface Escaped extends BaseNode {
  type: "escaped";
  character: string;
}

export type Inline =
  | NoparseSpan
  | Url
  | Spoiler
  | BoldItalics
  | Bold
  | Italics
  | Underline
  | Strike
  | Text
  | Escaped;
export type Block = NoparseBlock | CodeBlock | Heading | Reference | HorizontalRule | Quote | Paragraph;
/**
 * A node in the syntax tree.
 */
export type Node = Block | Inline;