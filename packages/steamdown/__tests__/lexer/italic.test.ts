import { describe, expect, test } from "@jest/globals";
import { Italic } from "../../src/lexer";

describe("Italic", () => {
  test.each([
    ["*foo*", true],
    ["_foo_", true],
    ["foo", false],
  ])('.hint("%s")', (md, expected) => {
    expect(Italic.hint(md)).toBe(expected);
  });

  describe.each([
    ["*foo*", "*foo*", "foo", ""],
    ["_foo_", "_foo_", "foo", ""],
    ["*a\nb*", "*a\nb*", "a\nb", ""],
    ["*a_b*", "*a_b*", "a_b", ""],
    ["*foo* bar", "*foo*", "foo", " bar"],
    ["*foo \\* bar*", "*foo \\* bar*", "foo \\* bar", ""],
  ])('lex("%s")', (md, expectedLiteral, expectedText, expectedRemainder) => {
    test('remainder', () => {
      const result = Italic.lex(md);
      expect(result).not.toBeNull();
      const [, remainder] = result!;
      expect(remainder).toBe(expectedRemainder);
    });

    test('.literal', () => {
      const result = Italic.lex(md);
      expect(result).not.toBeNull();
      const [token] = result!;
      expect(token.literal).toBe(expectedLiteral);
    });

    test('.text', () => {
      const result = Italic.lex(md);
      expect(result).not.toBeNull();
      const [token] = result!;
      expect(token.text).toBe(expectedText);
    });

    test('.tokens', () => {
      const result = Italic.lex(md);
      expect(result).not.toBeNull();
      const [token] = result!;
      expect(token.tokens).toMatchSnapshot();
    });

    test('.render()', () => {
      const result = Italic.lex(md);
      expect(result).not.toBeNull();
      const [token] = result!;
      expect(token.render()).toMatchSnapshot();
    });
  });

  test.each([["*foo"], ["*foo_"], ["*foo *"], ["*foo_"], ["*foo*bar"]])(
    'lex("%s")',
    (md) => {
      expect(Italic.lex(md)).toBeNull();
    },
  );
});
