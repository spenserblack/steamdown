const { parse } = require("../src/parser");

describe("parser", () => {
  describe.each([
    ["Hello, World!"],
    ["one\nparagraph\nspanning lines"],
    ["Foo\n\nBar"],
    ["*Italicized text*"],
    ["Nested *italicized* text"],
    ["Invalid * italicized * text with spaces"],
    ["Invalid *italicized\ntext* with a newline"],
    ["_Underlined text_"],
    ["Nested _underlined_ text"],
    ["Invalid _ underlined _ text with spaces"],
    ["Invalid _underlined\ntext_ with a newline"],
    ["*Italicized and _underlined_*"],
    ["**Bold text**"],
    ["Nested **bold** text"],
    ["Invalid ** bold ** text with spaces"],
    ["Invalid **bold\ntext** with a newline"],
    ["***Bold and italicized text***"],
  ])("parse(%p)", (text) => {
    const parsed = parse(text);

    describe(".tree", () => {
      it("matches the snapshot", () => {
        expect(parsed.tree).toMatchSnapshot();
      });
    });
  });
});
