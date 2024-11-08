#!/usr/bin/env node
import { Command } from "commander";
import { parse } from "@steamdown/core";
import getStdin from "get-stdin";
import fs from "node:fs/promises";

const program = new Command();
program
  .name("steamdown")
  .option("--ast", "Print the AST")
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
