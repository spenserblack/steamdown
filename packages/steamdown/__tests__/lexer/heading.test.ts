import { describe, expect, test } from "@jest/globals";
import { Heading } from "../../src/lexer";

const validInputs = [1, 2, 3, 4, 5, 6].map((n) => `${"#".repeat(n)} foo`);
const invalidInputs = ["no heading", "#no space"];
describe("Heading", () => {
  const hintTests = [
    ...validInputs.map((input) => [input, true]),
    [invalidInputs[0], false],
    [invalidInputs[1], true],
  ] as [string, boolean][];
  test.each(hintTests)(".hint(%s)", (md, expected) => {
    expect(Heading.hint(md)).toBe(expected);
  });

  test.each(validInputs.map((input, index) => [input, index + 1] as [string, number]))(
    "lex(%s)",
    (md, level) => {
      const result = Heading.lex(md);
      expect(result).not.toBeNull();
      const [token, remainder] = result!;
      expect(token).toBeInstanceOf(Heading);
      expect((token as Heading).level()).toBe(level);
      expect(remainder).toBe("foo");
    },
  );

  test.each(invalidInputs.map((input) => [input]))("lex(%s)", (md) => {
    expect(Heading.lex(md)).toBeNull();
  });
});
