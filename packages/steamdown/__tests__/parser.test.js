const { parse } = require("../src/parser");

describe("parse()", () => {
  test.each([
    ["Hello, World!"],
    ["one\nparagraph\nspanning lines"],
    ["Foo\n\nBar"],
    ["*Italicized text*"],
    ["Nested *italicized* text"],
    ["Invalid * italicized * text with spaces"],
    ["Invalid *italicized\ntext* with a newline"],
  ])("should parse %p", (text) => {
    const parsed = parse(text);
    expect(parsed).toMatchSnapshot();
  });
});
