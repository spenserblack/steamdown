import { addParser, useParsers, parse } from "./parsers";
import { noparse } from "./noparse";
import { code } from "./code";
import { header } from "./header";
import { paragraph } from "./paragraph";

[noparse, code, header, paragraph].forEach((parser) => {
  addParser(parser);
});

export { useParsers, parse };
