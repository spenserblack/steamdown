import { describe, expect, test } from "@jest/globals";
import { Italic } from "../../src/lexer";

describe("Italic", () => {
  test.each([
    ["*foo*", true],
    ["_foo_", true],
    ["foo", false],
  ])(".hint(%s)", (md, expected) => {
    expect(Italic.hint(md)).toBe(expected);
  });

  test.each([
    ["*foo*", "*foo*", "foo", ""],
    ["_foo_", "_foo_", "foo", ""],
    ["*a\nb*", "*a\nb*", "a\nb", ""],
    ["*a_b*", "*a_b*", "a_b", ""],
    ["*foo* bar", "*foo*", "foo", " bar"],
  ])("lex(%s)", (md, expectedLiteral, expectedText, expectedRemainder) => {
    const result = Italic.lex(md);
    expect(result).not.toBeNull();
    const [token, remainder] = result!;
    expect(token).toBeInstanceOf(Italic);
    expect((token as Italic).literal).toBe(expectedLiteral);
    expect((token as Italic).text).toBe(expectedText);
    expect(remainder).toBe(expectedRemainder);
  });

  test.each([["*foo"], ["*foo_"], ["*foo *"], ["*foo_"], ["*foo*bar"]])(
    "lex(%s)",
    (md) => {
      expect(Italic.lex(md)).toBeNull();
    },
  );
});
