import { describe, expect, test } from "@jest/globals";
import { NoparseSpan } from "../../src/lexer";

describe("NoparseSpan", () => {
  test.each([
    ["{{{foo}}}", true],
    ["{{foo}}", false],
    ["{foo}", false],
    ["foo", false],
  ])('.hint("%s")', (md, expected) => {
    expect(NoparseSpan.hint(md)).toBe(expected);
  });

  describe.each([
    ["{{{foo}}}", "{{{foo}}}", "foo", ""],
    ["{{{a\nb}}}", "{{{a\nb}}}", "a\nb", ""],
    ["{{{a}b}}}", "{{{a}b}}}", "a}b", ""],
    ["{{{foo}}} bar", "{{{foo}}}", "foo", " bar"],
    ["{{{*foo*}}}", "{{{*foo*}}}", "*foo*", ""],
  ])('lex("%s")', (md, expectedLiteral, expectedText, expectedRemainder) => {
    test("remainder", () => {
      const result = NoparseSpan.lex(md);
      expect(result).not.toBeNull();
      const [, remainder] = result!;
      expect(remainder).toBe(expectedRemainder);
    });

    test(".literal", () => {
      const result = NoparseSpan.lex(md);
      expect(result).not.toBeNull();
      const [token] = result!;
      expect(token.literal).toBe(expectedLiteral);
    });

    test(".text", () => {
      const result = NoparseSpan.lex(md);
      expect(result).not.toBeNull();
      const [token] = result!;
      expect(token.text).toBe(expectedText);
    });

    test(".render()", () => {
      const result = NoparseSpan.lex(md);
      expect(result).not.toBeNull();
      const [token] = result!;
      expect(token.render()).toMatchSnapshot();
    });
  });

  test.each([["{{{foo"], ["{{{foo}}"], ["{{{foo}}}bar"]])('lex("%s")', (md) => {
    expect(NoparseSpan.lex(md)).toBeNull();
  });
});
