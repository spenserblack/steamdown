import { describe, expect, test } from "@jest/globals";
import { Bold } from "../../src/lexer";

describe("Bold", () => {
  test.each([
    ["**foo**", true],
    ["__foo__", false],
    ["foo", false],
  ])(".hint(%s)", (md, expected) => {
    expect(Bold.hint(md)).toBe(expected);
  });

  test.each([
    ["**foo**", "**foo**", "foo", ""],
    ["**a\nb**", "**a\nb**", "a\nb", ""],
    ["**a*b**", "**a*b**", "a*b", ""],
    ["**foo** bar", "**foo**", "foo", " bar"],
    ["**foo \\*\\* bar**", "**foo \\*\\* bar**", "foo \\*\\* bar", ""],
  ])("lex(%s)", (md, expectedLiteral, expectedText, expectedRemainder) => {
    const result = Bold.lex(md);
    expect(result).not.toBeNull();
    const [token, remainder] = result!;
    expect(token).toBeInstanceOf(Bold);
    const bold = token as Bold;
    expect(bold.literal).toBe(expectedLiteral);
    expect(bold.text).toBe(expectedText);
    expect(bold.tokens).toMatchSnapshot();
    expect(remainder).toBe(expectedRemainder);
    expect(bold.render()).toMatchSnapshot();
  });

  test.each([["**foo"], ["**foo*"], ["**foo **"], ["**foo**bar"]])("lex(%s)", (md) => {
    expect(Bold.lex(md)).toBeNull();
  });
});
