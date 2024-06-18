const { parse } = require("../src/parser");

describe("parser", () => {
  describe.each([
    ["Hello, World!"],
    ["one\nparagraph\nspanning lines"],
    ["Foo\n\nBar"],
    ["*Italicized text*"],
    ["Nested *italicized* text"],
    ["Invalid * italicized * text with spaces"],
    ["Valid *italicized\ntext* with a newline"],
    ["Invalid *italicized\n\ntext* with newlines"],
    ["_Underlined text_"],
    ["Nested _underlined_ text"],
    ["Invalid _ underlined _ text with spaces"],
    ["Valid _underlined\ntext_ with a newline"],
    ["Invalid _underlined\n\ntext_ with newlines"],
    ["*Italicized and _underlined_*"],
    ["**Bold text**"],
    ["Nested **bold** text"],
    ["Invalid ** bold ** text with spaces"],
    ["Valid **bold\ntext** with a newline"],
    ["Invalid **bold\n\ntext** with newlines"],
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
