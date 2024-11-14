const fs = require("node:fs");
const path = require("node:path");
const { parse } = require("@steamdown/core");
const { render } = require("../dist");

const demoFile = fs.readFileSync(path.join(__dirname, "demo.stmd"), "utf-8");

describe("html", () => {
  describe("render", () => {
    it("renders the demo file", () => {
      const [tree, context] = parse(demoFile);
      const rendered = render(tree, context);
      expect(rendered).toMatchSnapshot();
    });
  });
});
