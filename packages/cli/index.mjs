#!/usr/bin/env node
import { Command, Option } from "commander";
import { parse, render } from "@steamdown/core";
import { render as html } from "@steamdown/html";
import getStdin from "get-stdin";
import fs from "node:fs/promises";

const astOption = new Option("--ast", "Print the AST instead of rendering").conflicts("html");
const htmlOption = new Option("--html", "Render to HTML instead of Steam markup").conflicts("ast");

const program = new Command();
program
  .name("steamdown")
  .description("Parse and render Steamdown files")
  .addOption(astOption)
  .addOption(htmlOption)
  .argument('[file]', 'File to parse (STDIN if not specified)')
  .action(async (file, options) => {
    const content = file == null ? getStdin() : fs.readFile(file, "utf-8");
    const { tree, context } = parse(await content);

    if (options.ast) {
      console.log(JSON.stringify(tree));
      return;
    }

    throw new Error("Not implemented");
  });
program.parse();
