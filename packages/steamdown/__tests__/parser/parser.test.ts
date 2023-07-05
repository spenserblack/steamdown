import { describe, expect, test } from "@jest/globals";
import Parser, { Heading } from "../../src/parser";

describe("Parser", () => {
  describe(".next()", () => {
    describe.each([
      ["# Heading 1", Heading],
      ["## Heading 2", Heading],
      ["### Heading 3", Heading],
      ["#### Heading 4", Heading],
      ["##### Heading 5", Heading],
      ["###### Heading 6", Heading],
      ["# Heading 1\n", Heading],
      ["## Heading 2\n", Heading],
      ["### Heading 3\n", Heading],
      ["#### Heading 4\n", Heading],
      ["##### Heading 5\n", Heading],
      ["###### Heading 6\n", Heading],
      ["# *Italic heading*", Heading],
      ["# _Italic heading_", Heading],
      ["# *Partially* italic heading", Heading],
      ["# *Italic heading* with *italic text*", Heading],
      ["# Heading with *italic tail*", Heading],
    ])("when given %p", (text, tokenType) => {
      test("returns a token", () => {
        const parser = new Parser(text);
        const token = parser.next();
        expect(token).toBeInstanceOf(tokenType);
      });

      test("inline tokens", () => {
        const parser = new Parser(text);
        const token = parser.next();
        expect(token.tokens).toMatchSnapshot();
      });

      test("rendered token", () => {
        const parser = new Parser(text);
        const token = parser.next();
        expect(token.render()).toMatchSnapshot();
      });
    });
  });
});
