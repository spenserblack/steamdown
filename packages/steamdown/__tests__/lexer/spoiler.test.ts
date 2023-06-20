import { describe, expect, test } from "@jest/globals";
import { Spoiler } from "../../src/lexer";

describe("Spoiler", () => {
  test.each([
    ["!!!foo!!!", true],
    ["!!foo!!!", false],
    ["foo", false],
  ])('.hint("%s")', (md, expected) => {
    expect(Spoiler.hint(md)).toBe(expected);
  });

  describe.each([
    ["!!!foo!!!", "!!!foo!!!", "foo", ""],
    ["!!!a\nb!!!", "!!!a\nb!!!", "a\nb", ""],
    ["!!!a!b!!!", "!!!a!b!!!", "a!b", ""],
    ["!!!foo!!! bar", "!!!foo!!!", "foo", " bar"],
    ["!!!foo\\!!!!", "!!!foo\\!!!!", "foo\\!", ""],
    ["!!!foo \\!\\!\\! bar!!!", "!!!foo \\!\\!\\! bar!!!", "foo \\!\\!\\! bar", ""],
  ])('lex("%s")', (md, expectedLiteral, expectedText, expectedRemainder) => {
    const result = Spoiler.lex(md);
    test("remainder", () => {
      expect(result).not.toBeNull();
      const [, remainder] = result!;
      expect(remainder).toBe(expectedRemainder);
    });

    test(".literal", () => {
      expect(result).not.toBeNull();
      const [token] = result!;
      expect(token.literal).toBe(expectedLiteral);
    });

    test(".text", () => {
      expect(result).not.toBeNull();
      const [token] = result!;
      expect(token.text).toBe(expectedText);
    });

    test(".tokens", () => {
      expect(result).not.toBeNull();
      const [token] = result!;
      expect(token.tokens).toMatchSnapshot();
    });

    test(".render()", () => {
      expect(result).not.toBeNull();
      const [token] = result!;
      expect(token.render()).toMatchSnapshot();
    });
  });

  test.each([["!!!foo"], ["!!!foo!"], ["!!!foo !!!"], ["!!!foo!!!bar"]])(
    'lex("%s")',
    (md) => {
      expect(Spoiler.lex(md)).toBeNull();
    },
  );
});
