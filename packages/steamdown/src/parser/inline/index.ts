import { useParsers, parse, addParser } from "./parse.js";
import { noparse } from "./noparse.js";
import { image } from "./image.js";
import { url } from "./url.js";
import { spoiler } from "./spoiler.js";
import { boldItalics } from "./bold-italics.js";
import { bold } from "./bold.js";
import { italics } from "./italics.js";
import { underline } from "./underline.js";
import { strike } from "./strike.js";
import { escaped } from "./escaped.js";
import { text } from "./text.js";

[
  noparse,
  image,
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
