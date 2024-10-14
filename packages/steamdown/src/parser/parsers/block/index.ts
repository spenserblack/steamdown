import { addParser, useParsers, parse } from "./parsers";
import { noparse } from "./noparse";
import { paragraph } from "./paragraph";

[noparse, paragraph].forEach((parser) => {
  addParser(parser);
});

export { useParsers, parse };
