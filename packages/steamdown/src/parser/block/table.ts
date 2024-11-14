import type * as nodes from "../../nodes";
import { ParseError, UnreachableError } from "../errors.js";
import { parse as parseInline } from "../inline/index.js";
import type { Parser } from "../types";

const head = Symbol("head");
type HeadSym = typeof head;
const attributes = Symbol("attributes");
type AttributesSym = typeof attributes;
const body = Symbol("body");
type BodySym = typeof body;

const borderedAttrRe = /^:?-+:?$/;
const borderlessAttrRe = /^:? *:?$/;

type TablePart = HeadSym | AttributesSym | BodySym;

/**
 * Parser for a table row.
 */
function parseTableRow(text: string, part: AttributesSym): [nodes.TableAttributeRow, remainder: string];
function parseTableRow(text: string, part: Exclude<TablePart, AttributesSym>): [nodes.TableRow, remainder: string];
function parseTableRow(text: string, part: TablePart): [nodes.TableRow | nodes.TableAttributeRow, remainder: string] {
  if (text == "" || /^\r?\n/.test(text)) {
    throw new ParseError("Empty table row");
  }


  const endLine = /$/m.exec(text)?.index;

  if (endLine == null) {
    throw new UnreachableError("The regex should always match");
  }

  let line = text.slice(0, endLine);
  if (!line.includes("|")) {
    throw new ParseError("Invalid table row");
  }
  // NOTE If the user didn't add `|` to the beginning or end of the row, we add it.
  if (!line.startsWith("|")) {
    line = "|" + line;
  }
  if (!line.endsWith("|")) {
    line = line + "|";
  }

  // TODO Improve performance with lazy iteration or `.reduce`
  const rawCells = text.slice(0, endLine).split("|");
  // NOTE Beginning and ending `|` are empty strings, so we remove them.
  rawCells.shift();
  rawCells.pop();
  const trimmedRawCells = rawCells.map((cell) => cell.trim());
  if (part === attributes && !trimmedRawCells.every((cell) => borderedAttrRe.test(cell) || borderlessAttrRe.test(cell))) {
    throw new ParseError("Invalid table attributes");
  }

  text = text.slice(endLine);
  const offset = /^\r\n/.test(text) ? 2 : 1;
  const remainder = text.slice(offset);

  if (part === attributes) {
    // NOTE Because we possibly remove the left and right sides of the row if they're
    //     empty, we use a fallback.
    const firstCell = trimmedRawCells[0] ?? "";
    const equalCells = firstCell.startsWith(":") && firstCell.endsWith(":");
    const noBorder = borderlessAttrRe.test(firstCell);
    return [{ type: "table-attribute-row", equalCells, noBorder }, remainder];
  }

  const cells: nodes.TableCell[] = trimmedRawCells.map((cell) => ({
    type: "table-cell",
    nodes: parseInline(cell),
  }));

  return [{ type: "table-row", cells }, remainder];
}

/**
 * Parser for tables.
 */
export const table = {
  hint: (text: string) => /^\|[^\n|]/.test(text),
  parse: (text: string): [nodes.Table, remainder: string] => {
    const headMatch = parseTableRow(text, head);
    const tHead = headMatch[0];
    text = headMatch[1];
    const attributesMatch = parseTableRow(text, attributes);
    const tAttributes = attributesMatch[0];
    text = attributesMatch[1];

    const tBody: nodes.TableRow[] = [];
    while (true) {
      try {
        const [row, remainder] = parseTableRow(text, body);
        text = remainder;
        tBody.push(row);
      } catch (e) {
        if (e instanceof ParseError) {
          break;
        }
        throw e;
      }
    }

    const node: nodes.Table = {
      type: "table",
      head: tHead,
      attributes: tAttributes,
      body: tBody,
    };

    return [node, text];
  },
} satisfies Parser<nodes.Table>;
