const { parse } = require("../src/parser");

describe("parse()", () => {
  test.each([["Hello, World!"], ["one\nparagraph\nspanning lines"], ["Foo\n\nBar"]])(
    "should parse %p",
    (text) => {
      const parsed = parse(text);
      expect(parsed).toMatchSnapshot();
    },
  );
});
