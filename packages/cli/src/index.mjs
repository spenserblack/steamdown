#!/usr/bin/env node
import { Command, Option } from "commander";
import { render } from "@steamdown/core";
import { render as html } from "@steamdown/html";
import handler from "./handler.mjs";

const astOption = new Option("--ast", "Print the AST instead of rendering").conflicts(
  "html",
);
const htmlOption = new Option(
  "--html",
  "Render to HTML instead of Steam markup",
).conflicts("ast");

const program = new Command();
program
  .name("steamdown")
  .description("Parse and render Steamdown files")
  .addOption(astOption)
  .addOption(htmlOption)
  .argument("[file]", "File to parse (STDIN if not specified)")
  .action(async (file, options) => {
    const [tree, context] = await handler(file, process.stdin);

    if (options.ast) {
      console.log(JSON.stringify(tree));
      return;
    }
    if (options.html) {
      console.log(html(tree, context));
      return;
    }

    console.log(render(tree, context));
  });
program.parse();
