import { describe, expect, test } from "@jest/globals";
import { Underline } from "../../src/lexer";

describe("Underline", () => {
  test.each([
    ["__foo__", true],
    ["**foo**", false],
    ["foo", false],
  ])(".hint(%s)", (md, expected) => {
    expect(Underline.hint(md)).toBe(expected);
  });

  test.each([
    ["__foo__", "__foo__", "foo", ""],
    ["__a\nb__", "__a\nb__", "a\nb", ""],
    ["__a_b__", "__a_b__", "a_b", ""],
    ["__foo__ bar", "__foo__", "foo", " bar"],
    ["__foo \\_\\_ bar__", "__foo \\_\\_ bar__", "foo \\_\\_ bar", ""],
  ])("lex(%s)", (md, expectedLiteral, expectedText, expectedRemainder) => {
    const result = Underline.lex(md);
    expect(result).not.toBeNull();
    const [token, remainder] = result!;
    expect(token).toBeInstanceOf(Underline);
    const underline = token as Underline;
    expect(underline.literal).toBe(expectedLiteral);
    expect(underline.text).toBe(expectedText);
    expect(underline.tokens).toMatchSnapshot();
    expect(remainder).toBe(expectedRemainder);
    expect(underline.render()).toMatchSnapshot();
  });

  test.each([["__foo"], ["__foo_"], ["__foo __"], ["__foo__bar"]])("lex(%s)", (md) => {
    expect(Underline.lex(md)).toBeNull();
  });
});
