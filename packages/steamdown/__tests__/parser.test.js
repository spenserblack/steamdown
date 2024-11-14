const { parse } = require("../dist/index");
const useAssets = require("./assets");

describe("parser", () => {
  describe("parse()", () => {
    describe("tree", () => {
      const assets = useAssets();
      test.each(assets)("$name", async ({ content }) => {
        const [tree] = parse(await content);
        expect(tree).toMatchSnapshot();
      });
    });
  });

  describe("parse()", () => {
    test("adds context when a reference is found", () => {
      const [, context] = parse("[reference]: https://example.com");
      expect(context.getLink("reference")).toBe("https://example.com");
    });
  });
});
