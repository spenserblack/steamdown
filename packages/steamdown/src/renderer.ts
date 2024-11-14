import type { Context } from "./context";
import type * as nodes from "./nodes";

// TODO Performance can be improved by not doing map + filter + join.

/**
 * Renders a block that only has text.
 */
const renderSimpleBlock = (tag: string, content: string): string =>
  `[${tag}]\n${content}\n[/${tag}]`;

const renderInlineNodes = (nodes: nodes.Inline[], context: Context): string =>
  nodes
    .map<string>((node) => {
      switch (node.type) {
        case "text":
          return node.text;
        case "escaped":
          return node.character;
        case "bold-italics":
          return `[b][i]${renderInlineNodes(node.nodes, context)}[/i][/b]`;
        case "bold":
          return `[b]${renderInlineNodes(node.nodes, context)}[/b]`;
        case "italics":
          return `[i]${renderInlineNodes(node.nodes, context)}[/i]`;
        case "underline":
          return `[u]${renderInlineNodes(node.nodes, context)}[/u]`;
        case "spoiler":
          return `[spoiler]${renderInlineNodes(node.nodes, context)}[/spoiler]`;
        case "strike":
          return `[strike]${renderInlineNodes(node.nodes, context)}[/strike]`;
        case "noparse-span":
          return `[noparse]${node.text}[/noparse]`;
        case "link-url":
          return `[url=${node.link}]${renderInlineNodes(node.nodes, context)}[/url]`;
        case "id-url": {
          const link = context.getLink(node.id);
          const content =
            node.nodes != null ? renderInlineNodes(node.nodes, context) : node.id;
          // NOTE If the link is not found, we just render the text.
          return link != null ? `[url=${link}]${content}[/url]` : `[${content}]`;
        }
      }
    })
    .join("");

const renderList = (list: nodes.List, context: Context): string => {
  const tag = list.ordered ? "olist" : "list";
  const items = list.items
    .map((item) => `  [*]${renderBlocks(item.nodes, context)}`)
    .join("\n");
  return `[${tag}]\n${items}\n[/${tag}]`;
};

const renderTableRow = (
  row: nodes.TableRow,
  context: Context,
  cellTag: "td" | "th",
): string => {
  const renderedCells = row.cells
    .map(
      (cell) =>
        `    [${cellTag}]${renderInlineNodes(cell.nodes, context)}[/${cellTag}]`,
    )
    .join("\n");
  return `  [tr]\n${renderedCells}\n  [/tr]`;
};

const renderTable = (table: nodes.Table, context: Context): string => {
  let openTag = "table";
  if (table.attributes.noBorder) {
    openTag += " noborder=1";
  }
  if (table.attributes.equalCells) {
    openTag += " equalcells=1";
  }
  const renderedHeader = renderTableRow(table.head, context, "th");
  const renderedBody = table.body
    .map((row) => renderTableRow(row, context, "td"))
    .join("\n");
  return `[${openTag}]\n${renderedHeader}\n${renderedBody}\n[/table]`;
};

const renderBlocks = (blocks: nodes.Block[], context: Context): string =>
  blocks
    .map((node) => {
      switch (node.type) {
        case "reference":
          // NOTE References are not rendered
          return null;
        case "noparse-block":
          return renderSimpleBlock("noparse", node.text);
        case "code-block":
          return renderSimpleBlock("code", node.text);
        case "horizontal-rule":
          return "\n[hr][/hr]\n";
        case "heading":
          return `[h${node.level}]${renderInlineNodes(node.nodes, context)}[/h${node.level}]`;
        case "quote": {
          const [author, postId] = node.author ?? [];
          const openTag =
            author != null
              ? `[quote=${author}${postId != null ? `;${postId}` : ""}]`
              : "[quote]";
          return `${openTag}\n${renderBlocks(node.nodes, context)}\n[/quote]`;
        }
        case "paragraph":
          return renderInlineNodes(node.nodes, context);
        case "list":
          return renderList(node, context);
        case "table":
          return renderTable(node, context);
      }
    })
    .filter((rendered) => rendered != null)
    .join("\n\n");

/**
 * Renders the syntax tree into Steam's markup.
 */
export const render = (root: nodes.Root, context: Context): string =>
  renderBlocks(root.nodes, context);
