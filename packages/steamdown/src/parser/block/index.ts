import { addParser, useParsers, parse } from "./parsers";
import { noparse } from "./noparse";
import { code } from "./code";
import { reference } from "./reference";
import { heading, altHeading } from "./heading";
import { horizontalRule } from "./horizontal-rule";
import { quote } from "./quote";
import { paragraph } from "./paragraph";

[noparse, code, reference, heading, altHeading, horizontalRule, quote, paragraph].forEach((parser) => {
  addParser(parser);
});

export { useParsers, parse };