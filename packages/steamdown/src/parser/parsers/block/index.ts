import { addParser, useParsers, parse } from "./parsers";
import { noparse } from "./noparse";
import { code } from "./code";
import { paragraph } from "./paragraph";

[noparse, code, paragraph].forEach((parser) => {
  addParser(parser);
});

export { useParsers, parse };
