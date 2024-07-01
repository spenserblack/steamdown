const { lexAllInline, inlineTokens, inlineLexer } = require("../src/lexer");

describe("lexer", () => {
  describe.each([
    ["Hello, World!", [[inlineTokens.text, "Hello, World!", { x: 0, y: 0 }]]],
    [
      "one\nparagraph\nspanning lines",
      [
        [inlineTokens.text, "one", { x: 0, y: 0 }],
        [inlineTokens.newline, "\n", { x: 3, y: 0 }],
        [inlineTokens.text, "paragraph", { x: 0, y: 1 }],
        [inlineTokens.newline, "\n", { x: 9, y: 1 }],
        [inlineTokens.text, "spanning lines", { x: 0, y: 2 }],
      ],
    ],
    [
      "*Italicized text*",
      [
        [inlineTokens.asterisk, "*", { x: 0, y: 0 }],
        [inlineTokens.text, "Italicized text", { x: 1, y: 0 }],
        [inlineTokens.asterisk, "*", { x: 16, y: 0 }],
      ],
    ],
    [
      "Nested *italicized* text",
      [
        [inlineTokens.text, "Nested ", { x: 0, y: 0 }],
        [inlineTokens.asterisk, "*", { x: 7, y: 0 }],
        [inlineTokens.text, "italicized", { x: 8, y: 0 }],
        [inlineTokens.asterisk, "*", { x: 18, y: 0 }],
        [inlineTokens.text, " text", { x: 19, y: 0 }],
      ],
    ],
    [
      "*Italics* and *more italics*",
      [
        [inlineTokens.asterisk, "*", { x: 0, y: 0 }],
        [inlineTokens.text, "Italics", { x: 1, y: 0 }],
        [inlineTokens.asterisk, "*", { x: 8, y: 0 }],
        [inlineTokens.text, " and ", { x: 9, y: 0 }],
        [inlineTokens.asterisk, "*", { x: 14, y: 0 }],
        [inlineTokens.text, "more italics", { x: 15, y: 0 }],
        [inlineTokens.asterisk, "*", { x: 27, y: 0 }],
      ],
    ],
    [
      "_Underlined text_",
      [
        [inlineTokens.underscore, "_", { x: 0, y: 0 }],
        [inlineTokens.text, "Underlined text", { x: 1, y: 0 }],
        [inlineTokens.underscore, "_", { x: 16, y: 0 }],
      ],
    ],
    [
      "*Italicized and _underlined_*",
      [
        [inlineTokens.asterisk, "*", { x: 0, y: 0 }],
        [inlineTokens.text, "Italicized and ", { x: 1, y: 0 }],
        [inlineTokens.underscore, "_", { x: 16, y: 0 }],
        [inlineTokens.text, "underlined", { x: 17, y: 0 }],
        [inlineTokens.underscore, "_", { x: 27, y: 0 }],
        [inlineTokens.asterisk, "*", { x: 28, y: 0 }],
      ],
    ],
    [
      "**Bold text**",
      [
        [inlineTokens.asterisk, "*", { x: 0, y: 0 }],
        [inlineTokens.asterisk, "*", { x: 1, y: 0 }],
        [inlineTokens.text, "Bold text", { x: 2, y: 0 }],
        [inlineTokens.asterisk, "*", { x: 11, y: 0 }],
        [inlineTokens.asterisk, "*", { x: 12, y: 0 }],
      ],
    ],
    [
      "Nested **bold** text",
      [
        [inlineTokens.text, "Nested ", { x: 0, y: 0 }],
        [inlineTokens.asterisk, "*", { x: 7, y: 0 }],
        [inlineTokens.asterisk, "*", { x: 8, y: 0 }],
        [inlineTokens.text, "bold", { x: 9, y: 0 }],
        [inlineTokens.asterisk, "*", { x: 13, y: 0 }],
        [inlineTokens.asterisk, "*", { x: 14, y: 0 }],
        [inlineTokens.text, " text", { x: 15, y: 0 }],
      ],
    ],
    [
      "***Bold and italicized text***",
      [
        [inlineTokens.asterisk, "*", { x: 0, y: 0 }],
        [inlineTokens.asterisk, "*", { x: 1, y: 0 }],
        [inlineTokens.asterisk, "*", { x: 2, y: 0 }],
        [inlineTokens.text, "Bold and italicized text", { x: 3, y: 0 }],
        [inlineTokens.asterisk, "*", { x: 27, y: 0 }],
        [inlineTokens.asterisk, "*", { x: 28, y: 0 }],
        [inlineTokens.asterisk, "*", { x: 29, y: 0 }],
      ],
    ],
    [
      "~strike text~",
      [
        [inlineTokens.tilde, "~", { x: 0, y: 0 }],
        [inlineTokens.text, "strike text", { x: 1, y: 0 }],
        [inlineTokens.tilde, "~", { x: 12, y: 0 }],
      ],
    ],
    [
      "~~strike text~~",
      [
        [inlineTokens.tilde, "~", { x: 0, y: 0 }],
        [inlineTokens.tilde, "~", { x: 1, y: 0 }],
        [inlineTokens.text, "strike text", { x: 2, y: 0 }],
        [inlineTokens.tilde, "~", { x: 13, y: 0 }],
        [inlineTokens.tilde, "~", { x: 14, y: 0 }],
      ],
    ],
    [
      "\\*escaped\\*",
      [
        [inlineTokens.escape, "\\", { x: 0, y: 0 }],
        [inlineTokens.asterisk, "*", { x: 1, y: 0 }],
        [inlineTokens.text, "escaped", { x: 2, y: 0 }],
        [inlineTokens.escape, "\\", { x: 9, y: 0 }],
        [inlineTokens.asterisk, "*", { x: 10, y: 0 }],
      ],
    ],
    [
      "*italics \\*escaped\\**",
      [
        [inlineTokens.asterisk, "*", { x: 0, y: 0 }],
        [inlineTokens.text, "italics ", { x: 1, y: 0 }],
        [inlineTokens.escape, "\\", { x: 9, y: 0 }],
        [inlineTokens.asterisk, "*", { x: 10, y: 0 }],
        [inlineTokens.text, "escaped", { x: 11, y: 0 }],
        [inlineTokens.escape, "\\", { x: 18, y: 0 }],
        [inlineTokens.asterisk, "*", { x: 19, y: 0 }],
        [inlineTokens.asterisk, "*", { x: 20, y: 0 }],
      ],
    ],
    [
      "Use a \\\\ to escape special characters",
      [
        [inlineTokens.text, "Use a ", { x: 0, y: 0 }],
        [inlineTokens.escape, "\\", { x: 6, y: 0 }],
        [inlineTokens.escape, "\\", { x: 7, y: 0 }],
        [inlineTokens.text, " to escape special characters", { x: 8, y: 0 }],
      ],
    ],
    [
      "{not parsed}",
      [
        [inlineTokens.leftCurly, "{", { x: 0, y: 0 }],
        [inlineTokens.text, "not parsed", { x: 1, y: 0 }],
        [inlineTokens.rightCurly, "}", { x: 11, y: 0 }],
      ],
    ],
  ])("inlineLexer(`%s`)", (text, expected) => {
    test("lexes all inline tokens", () => {
      const [next, hasNext] = inlineLexer(text);
      expected.forEach((lexed) => {
        expect(hasNext()).toBe(true);
        expect(next()).toEqual(lexed);
      });
      expect(hasNext()).toBe(false);
    });

    test("snapshot", () => {
      expect(lexAllInline(text)).toMatchSnapshot();
    });
  });
});
