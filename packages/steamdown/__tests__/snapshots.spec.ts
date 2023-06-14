import { describe, expect, test } from "@jest/globals";
import { readFile } from "fs/promises";
import render from "../src/index";
import { resolve } from "path";

describe("parse spec", () => {
  const tests = ["basic", "list-items"].map((name) => [name]);
  test.each(tests)("%s", async (name: string) => {
    const path = resolve(__dirname, "./input", `${name}.md`);
    const src = await readFile(path, "utf8");
    expect(render(src)).toMatchSnapshot();
  });
});
