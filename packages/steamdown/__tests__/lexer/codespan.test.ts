import { describe, expect, test } from "@jest/globals";
import { Codespan } from "../../src/lexer";

describe("Codespan", () => {
  test.each([
    ["`foo`", true],
    ["foo", false],
  ])('.hint("%s")', (md, expected) => {
    expect(Codespan.hint(md)).toBe(expected);
  });

  describe.each([
    ["`foo`", "`foo`", "foo", ""],
    ["`a\nb`", "`a\nb`", "a\nb", ""],
    ["`foo` bar", "`foo`", "foo", " bar"],
    ["`foo \\` bar`", "`foo \\` bar`", "foo \\` bar", ""],
  ])('lex("%s")', (md, expectedLiteral, expectedText, expectedRemainder) => {
    test("remainder", () => {
      const result = Codespan.lex(md);
      expect(result).not.toBeNull();
      const [, remainder] = result!;
      expect(remainder).toBe(expectedRemainder);
    });

    test(".literal", () => {
      const result = Codespan.lex(md);
      expect(result).not.toBeNull();
      const [token] = result!;
      expect(token.literal).toBe(expectedLiteral);
    });

    test(".text", () => {
      const result = Codespan.lex(md);
      expect(result).not.toBeNull();
      const [token] = result!;
      expect(token.text).toBe(expectedText);
    });

    test(".tokens", () => {
      const result = Codespan.lex(md);
      expect(result).not.toBeNull();
      const [token] = result!;
      expect(token.tokens).toMatchSnapshot();
    });

    test(".render()", () => {
      const result = Codespan.lex(md);
      expect(result).not.toBeNull();
      const [token] = result!;
      expect(token.render()).toMatchSnapshot();
    });
  });

  test.each([["`foo"], ["`foo`bar"]])('lex("%s")', (md) => {
    expect(Codespan.lex(md)).toBeNull();
  });
});
