import { addParser, useParsers, parse } from "./parse.js";
import { noparse } from "./noparse.js";
import { code } from "./code.js";
import { table } from "./table.js";
import { reference } from "./reference.js";
import { heading, altHeading } from "./heading.js";
import { horizontalRule } from "./horizontal-rule.js";
import { list } from "./list.js";
import { quote } from "./quote.js";
import { paragraph } from "./paragraph.js";

[
  noparse,
  code,
  table,
  reference,
  heading,
  altHeading,
  horizontalRule,
  list,
  quote,
  paragraph,
].forEach((parser) => {
  addParser(parser);
});

export { useParsers, parse };
