import { addParser, useParser, parse } from "./parsers";
import { paragraph } from "./paragraph";

[paragraph].forEach((parser) => {
  addParser(parser);
});

export { useParser, parse };
