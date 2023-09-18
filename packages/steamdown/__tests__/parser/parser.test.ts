import { describe, expect, test } from "@jest/globals";
import Parser, { Heading, Paragraph } from "../../src/parser";

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
  ["simple paragraph", Paragraph],
  ["*Italic paragraph*", Paragraph],
  ["_Italic paragraph_", Paragraph],
  ["*Partially* italic paragraph", Paragraph],
  ["*Italic paragraph* with *italic text*", Paragraph],
  ["Paragraph with *italic tail*", Paragraph],
  ["*Un*decided", Paragraph],
  ["**Bold paragraph**", Paragraph],
  ["Paragraph with **bold tail**", Paragraph],
  ["**Paragraph with *nested italics***", Paragraph],
  ["**Paragraph with *nested* italics**", Paragraph],
  ["*Paragraph with **nested bold***", Paragraph],
  ["*Paragraph with **nested** bold*", Paragraph],
  ["Emphasized l*e*tter", Paragraph],
  ["Really emphasized l***e***tter", Paragraph],
  ["__Underlined paragraph__", Paragraph],
  ["__***all*** the things__", Paragraph],
  ["___Underline with italics___", Paragraph],
  ["`inline code`", Paragraph],
  ["`inline code *with special syntax* inside`", Paragraph],
  ["*`styled inline code`*", Paragraph],
  ["{{{inline noparse}}}", Paragraph],
  ["{{{inline noparse `with inline code` inside}}}", Paragraph],
  ["*{{{styled inline noparse}}}*", Paragraph],
  ["{{{inline noparse *with italics* inside}}}", Paragraph],
  ["{{{inline noparse with [block] inside}}}", Paragraph],
  ["!!!inline spoiler!!!", Paragraph],
  ["!!!inline spoiler *with italics* inside!!!", Paragraph],
  ["*!!!styled inline spoiler!!!*", Paragraph],
  ["[link](https://example.com)", Paragraph],
  ["[link with *italics*](https://example.com)", Paragraph],
  ["*[italicized link](https://example.com)*", Paragraph],
  ["[standalone link]", Paragraph],
])('Parser("%s")', (text, tokenType) => {
  describe(".next()", () => {
    const parser = new Parser(text);
    const token = parser.next();
    test(`Is instanceof ${tokenType.name}`, () => {
      expect(token).toBeInstanceOf(tokenType);
    });

    test("snapshot", () => {
      expect(token).toMatchSnapshot();
    });

    test(".render()", () => {
      const parser = new Parser(text);
      const token = parser.next();
      expect(token.render()).toMatchSnapshot();
    });
  });
});

// TODO Test unusual syntax like "*"
