import type { nodes, Context } from "@steamdown/core";
import { htmlEscape } from "escape-goat";

// TODO Performance can be improved by not doing map + filter + join.

/**
 * Data to be converted to an HTML tag.
 */
type Tag = string | [tag: string, classes: string[]];

/**
 * Maps a node type to the appropriate HTML tag.
 */
type InlineTagMap = {
  bold: Tag;
  italics: Tag;
  underline: Tag;
  spoiler: Tag;
  strike: Tag;
};

/**
 * Renderer to convert the syntax tree into HTML.
 */
export class Renderer {
  /**
   * Allows configuring the tags used for rendering (once this is made public).
   */
  private readonly tags: InlineTagMap = {
    bold: "strong",
    italics: "em",
    underline: "u",
    spoiler: ["span", ["spoiler"]],
    strike: "s",
  };

  public constructor(private readonly ctx: Context) {}

  /**
   * Renders an inline HTML tag.
   *
   * `safeText` should be a string that doesn't need to be escaped.
   */
  private renderInline(safeText: string, tag: keyof InlineTagMap): string {
    const tagData = this.tags[tag];
    const [tagName, classes] = typeof tagData === "string" ? [tagData, []] : tagData;
    const openTag = `${tagName}${classes.length > 0 ? ` class="${classes.join(" ")}"` : ""}`;
    return `<${openTag}>${safeText}</${tagName}>`;
  }

  private renderInlineNode(node: nodes.Inline): string {
    switch (node.type) {
      case "text":
        return htmlEscape(node.text).replace(/\n/g, "<br>");
      case "escaped":
        return htmlEscape(node.character);
      case "bold-italics": {
        const rendered = this.renderInlineNodes(node.nodes);
        const italicized = this.renderInline(rendered, "italics");
        return this.renderInline(italicized, "bold");
      }
      case "bold":
      case "italics":
      case "underline":
      case "spoiler":
      case "strike":
        return this.renderInline(this.renderInlineNodes(node.nodes), node.type);
      case "noparse-span":
        return htmlEscape(node.text).replace(/\n/g, "<br>");
      case "link-url": {
        const content = this.renderInlineNodes(node.nodes);
        return `<a href="${node.link}">${content}</a>`;
      }
      case "id-url": {
        const link = this.ctx.getLink(node.id);
        const content =
          node.nodes != null ? this.renderInlineNodes(node.nodes) : htmlEscape(node.id);
        return link != null ? `<a href="${link}">${content}</a>` : `[${content}]`;
      }
    }
  }

  private renderInlineNodes(nodes: nodes.Inline[]): string {
    return nodes.map((node) => this.renderInlineNode(node)).join("");
  }

  private renderList(list: nodes.List): string {
    const tag = list.ordered ? "ol" : "ul";
    const items = list.items
      .map((item) => `<li>${this.renderBlocks(item.nodes)}</li>`)
      .join("\n");
    return `<${tag}>\n${items}\n</${tag}>`;
  }

  private renderTableRow(row: nodes.TableRow, cellTag: "td" | "th"): string {
    const renderedCells = row.cells
      .map((cell) => `<${cellTag}>${this.renderInlineNodes(cell.nodes)}</${cellTag}>`)
      .join("\n");
    return `<tr>\n${renderedCells}\n</tr>`;
  }

  private renderTable(table: nodes.Table): string {
    const classes = [];
    if (table.attributes.noBorder) {
      classes.push("noborder");
    }
    if (table.attributes.equalCells) {
      classes.push("equalcells");
    }
    const openTag = `table${classes.length > 0 ? ` class="${classes.join(" ")}"` : ""}`;
    const renderedHeader = this.renderTableRow(table.head, "th");
    const renderedBody = table.body
      .map((row) => this.renderTableRow(row, "td"))
      .join("\n");
    return `<${openTag}>\n<thead>\n${renderedHeader}\n</thead>\n<tbody>\n${renderedBody}\n</tbody>\n</table>`;
  }

  private renderBlock(block: nodes.Block): string {
    switch (block.type) {
      case "reference":
        // NOTE References are not rendered
        return "";
      case "noparse-block":
        return `<div class="noparse">${htmlEscape(block.text).replace(/\n/g, "<br>")}</div>`;
      case "code-block":
        return `<pre class="code"><code>${htmlEscape(block.text)}</code></pre>`;
      case "horizontal-rule":
        return "<hr>";
      case "heading": {
        const tag = `h${block.level}`;
        return `<${tag}>${this.renderInlineNodes(block.nodes)}</${tag}>`;
      }
      case "quote": {
        const [author] = block.author ?? [];
        const caption =
          author != null
            ? `<figcaption>Originally posted by <cite>${author}</cite>:</figcaption>`
            : "";
        return `<figure class="quote">${caption}<blockquote>${this.renderBlocks(block.nodes)}</blockquote></figure>`;
      }
      case "paragraph":
        return `<p>${this.renderInlineNodes(block.nodes)}</p>`;
      case "list":
        return this.renderList(block);
      case "table":
        return this.renderTable(block);
    }
  }

  private renderBlocks(blocks: nodes.Block[]): string {
    return blocks.map((block) => this.renderBlock(block)).join("");
  }

  /**
   * Renders the syntax tree into HTML.
   */
  public render(root: nodes.Root): string {
    return this.renderBlocks(root.nodes);
  }
}

/**
 * Renders the syntax tree into HTML.
 */
export const render = (root: nodes.Root, context: Context): string => {
  const renderer = new Renderer(context);
  return renderer.render(root);
};
