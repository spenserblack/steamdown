import { describe, expect, test } from "@jest/globals";
import { Underline } from "../../src/lexer";

describe("Underline", () => {
  test.each([
    ["__foo__", true],
    ["**foo**", false],
    ["foo", false],
  ])('.hint("%s")', (md, expected) => {
    expect(Underline.hint(md)).toBe(expected);
  });

  describe.each([
    ["__foo__", "__foo__", "foo", ""],
    ["__a\nb__", "__a\nb__", "a\nb", ""],
    ["__a_b__", "__a_b__", "a_b", ""],
    ["__foo__ bar", "__foo__", "foo", " bar"],
    ["__foo \\_\\_ bar__", "__foo \\_\\_ bar__", "foo \\_\\_ bar", ""],
  ])('lex("%s")', (md, expectedLiteral, expectedText, expectedRemainder) => {
    const result = Underline.lex(md);

    test('remainder', () => {
      expect(result).not.toBeNull();
      const [, remainder] = result!;
      expect(remainder).toBe(expectedRemainder);
    });

    test('.literal', () => {
      expect(result).not.toBeNull();
      const [token] = result!;
      expect(token.literal).toBe(expectedLiteral);
    });

    test('.text', () => {
      expect(result).not.toBeNull();
      const [token] = result!;
      expect(token.text).toBe(expectedText);
    });

    test('.tokens', () => {
      expect(result).not.toBeNull();
      const [token] = result!;
      expect(token.tokens).toMatchSnapshot();
    });

    test('.render()', () => {
      expect(result).not.toBeNull();
      const [token] = result!;
      expect(token.render()).toMatchSnapshot();
    });
  });

  test.each([["__foo"], ["__foo_"], ["__foo __"], ["__foo__bar"]])('lex("%s")', (md) => {
    expect(Underline.lex(md)).toBeNull();
  });
});
