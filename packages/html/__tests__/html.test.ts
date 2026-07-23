import fs from "node:fs";
import path from "node:path";
import { describe, expect, test, it } from "vitest";
import { parse } from "@steamdown/core";
import { render } from "../src/index";

const demoFile = fs.readFileSync(path.join(__dirname, "demo.stmd"), "utf-8");

describe("html", () => {
  describe("render", () => {
    it("renders the demo file", () => {
      const [tree, context] = parse(demoFile);
      const rendered = render(tree, context);
      expect(rendered).toMatchSnapshot();
    });

    test.each([
      ["escapes", "\\*visible asterisks\\*"],
      ["image references", "![alt][id]\n\n[id]: https://example.com/image.png"]
    ])("%s", (_name, source) => {
      const [tree, context] = parse(source);
      const rendered = render(tree, context);
      expect(rendered).toMatchSnapshot();
    });
  });
});
