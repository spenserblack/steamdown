import { useParsers, parse, addParser } from "./parse";
import { noparse } from "./noparse";
import { url } from "./url";
import { spoiler } from "./spoiler";
import { boldItalics } from "./bold-italics";
import { bold } from "./bold";
import { italics } from "./italics";
import { underline } from "./underline";
import { strike } from "./strike";
import { escaped } from "./escaped";
import { text } from "./text";

[
  noparse,
  url,
  spoiler,
  boldItalics,
  bold,
  italics,
  underline,
  strike,
  escaped,
  text,
].forEach((parser) => {
  addParser(parser);
});

export { useParsers, parse };
