import { describe, expect, test } from "@jest/globals";
import { Text } from "../../src/lexer";

describe("Text", () => {
  test.each([
    ["not empty", true],
    ["", false],
  ])(".hint(%p)", (md, expected) => {
    expect(Text.hint(md)).toBe(expected);
  });

  test("It lexes the whole string", () => {
    const md = "foo";
    const result = Text.lex(md);
    expect(result).not.toBeNull();
    const [token, remainder] = result!;
    expect(token).toBeInstanceOf(Text);
    expect((token as Text).literal).toBe(md);
    expect((token as Text).content).toBe(md);
    expect(remainder).toBe("");
  });
});
