import { addParser, useParsers, parse } from "./parsers";
import { noparse } from "./noparse";
import { code } from "./code";
import { reference } from "./reference";
import { heading, altHeading } from "./heading";
import { horizontalRule } from "./horizontal-rule";
import { paragraph } from "./paragraph";

[noparse, code, reference, heading, altHeading, horizontalRule, paragraph].forEach((parser) => {
  addParser(parser);
});

export { useParsers, parse };
