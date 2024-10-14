import { addParser, useParsers, parse } from "./parsers";
import { paragraph } from "./paragraph";

[paragraph].forEach((parser) => {
  addParser(parser);
});

export { useParsers, parse };
