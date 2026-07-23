import { describe, expect, test } from "vitest";
import { parse } from "../src/index";
import useAssets from "./assets/index";

describe("parser", () => {
  describe("parse()", () => {
    describe("tree", async () => {
      const assets = await useAssets();
      test.each(assets)("$name", ({ content }) => {
        const [tree] = parse(content);
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
