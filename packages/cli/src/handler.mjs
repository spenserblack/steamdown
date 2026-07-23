import { text } from "node:stream/consumers";
import fs from "node:fs/promises";
import { parse } from "@steamdown/core";

/**
 * Handles reading and parsing from a file, or STDIN if no file is specified.
 * @param {string | null | undefined} file The file to read from, or a null-ish value to use STDIN.
 * @param stdin The STDIN stream. Optional when file is a string.
 */
const handler = async (file, stdin) => {
  const asyncContent = file == null ? text(stdin) : fs.readFile(file, "utf-8");
  const content = await asyncContent;
  return parse(content);
};

export default handler;
