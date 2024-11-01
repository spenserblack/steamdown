import { addParser, useParsers, parse } from "./parsers";
import { noparse } from "./noparse";
import { code } from "./code";
import { reference } from "./reference";
import { heading, altHeading } from "./heading";
import { paragraph } from "./paragraph";

[noparse, code, reference, heading, altHeading, paragraph].forEach((parser) => {
  addParser(parser);
});

export { useParsers, parse };
