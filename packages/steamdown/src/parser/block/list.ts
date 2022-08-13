import * as nodes from "../../nodes";
import { parse as parseBlocks } from "./parse";
import { UnreachableError, ParseError } from "../errors";
import { Parser } from "../types";

const numerical = Symbol("numerical");
type ListType = "-" | "*" | typeof numerical;

const listTypeValidators: Record<ListType, RegExp> = {
  "-": /^- /,
  "*": /^\* /,
  [numerical]: /^\d+\. /,
};

/**
 * Parses a list item.
 */
const parseItem = (
  text: string,
  listType: ListType,
): [nodes.ListItem, remainder: string] | null => {
  if (!listTypeValidators[listType].test(text)) {
    return null;
  }

  const indentLevel = listType === numerical ? /^\d+/.exec(text)![0].length + 2 : 2;

  const indent = " ".repeat(indentLevel);
  let content = "";

  // NOTE Empty lines are accepted (e.g. paragraph separators in a list item)
  do {
    const line = /[^\n]*(?:\r?\n|$)/.exec(text)?.[0];

    if (line == null) {
      throw new UnreachableError("The regex should always match");
    }

    text = text.slice(line.length);
    // HACK If the line is just a newline, we shouldn't slice it.
    content += /^\r?\n/.test(line) ? line : line.slice(indentLevel);
  } while (text.startsWith(indent) || /^\r?\n/.test(text));

  const nodes = parseBlocks(content);

  const item: nodes.ListItem = {
    type: "list-item",
    nodes,
  };

  return [item, text];
};

/**
 * Parser for a list node.
 */
export const list = {
  hint: (text: string) => /^(?:\-|\*|\d+\.) /.test(text),
  parse: (text: string): [nodes.List, remainder: string] => {
    const match = /^(\-|\*|\d+\.) /.exec(text);

    if (!match) {
      throw new UnreachableError(
        "The hint should ensure that there is at least 1 bullet",
      );
    }
    const bullet = match[1];
    const listType: ListType = bullet === "-" ? "-" : bullet === "*" ? "*" : numerical;

    const items: nodes.ListItem[] = [];
    let item = parseItem(text, listType);

    while (item != null) {
      items.push(item[0]);
      text = item[1];
      item = parseItem(text, listType);
    }

    const node: nodes.List = {
      type: "list",
      ordered: listType === numerical,
      items,
    };

    return [node, text];
  },
};
