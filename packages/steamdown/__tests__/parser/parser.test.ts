import { describe, expect, test } from "@jest/globals";
import Parser, { Heading } from "../../src/parser";

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
  ["# **Bold heading**", Heading],
  ["# Heading with **bold tail**", Heading],
  ["# **Heading with *nested italics***", Heading],
  ["# **Heading with *nested* italics**", Heading],
  ["# *Heading with **nested bold***", Heading],
  ["# *Heading with **nested** bold*", Heading],
])('Parser("%s")', (text, tokenType) => {
  describe(".next()", () => {
    const parser = new Parser(text);
    const token = parser.next();
    test(`Is instanceof ${tokenType.name}`, () => {
      expect(token).toBeInstanceOf(tokenType);
    });

    test(".tokens", () => {
      expect(token.tokens).toMatchSnapshot();
    });

    test(".render()", () => {
      const parser = new Parser(text);
      const token = parser.next();
      expect(token.render()).toMatchSnapshot();
    });
  });
});

// TODO Test unusual syntax like "*"
