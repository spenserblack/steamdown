import { addParser, useParsers, parse } from "./parsers";
import { noparse } from "./noparse";
import { code } from "./code";
import { heading } from "./heading";
import { paragraph } from "./paragraph";

[noparse, code, heading, paragraph].forEach((parser) => {
  addParser(parser);
});

export { useParsers, parse };
