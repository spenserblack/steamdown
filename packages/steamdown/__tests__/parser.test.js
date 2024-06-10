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
  ])("parse(%p)", (text) => {
    const parsed = parse(text);

    describe(".tree", () => {
      it("matches the snapshot", () => {
        expect(parsed.tree).toMatchSnapshot();
      });
    });
  });
});
