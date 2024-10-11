const { parse } = require("../src/parser");

describe("parser", () => {
  describe.each([
    ["Hello, World!"],
    ["one\nparagraph\nspanning lines"],
    ["Foo\n\nBar"],
    ["*Italicized text*"],
    ["Nested *italicized* text"],
    ["*Italics* and *more italics*"],
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
    ["~strike text~"],
    ["~~strike text~~"],
    ["~~Maybe strike text~"],
    ["~Maybe strike text~~"],
    ["Nested ~strike~ text"],
    ["strike with ~leading text~"],
    ["strike with ~~leading text~~"],
    ["~strike~ with trailing text"],
    ["~~strike~~ with trailing text"],
    ["Valid ~strike\ntext~ with a newline"],
    ["Invalid ~strike\n\ntext~ with newlines"],
    ["~ strike with spaces ~"],
    ["~*striked italics*~"],
    ["*~italicized strike~*"],
    ["~strike~ and ~~another strike~~"],
    ["\\*escaped\\*"],
    ["*italics \\*escaped\\**"],
    ["\\*\\*escaped\\*\\*"],
    ["**bold \\*escaped\\***"],
    ["\\~escaped\\~"],
    ["~strike \\~escaped\\~"],
    ["~strike \\~escaped~"],
    ["\\~strike \\~escaped\\~"],
    ["Use a \\\\ to escape special characters"],
    ["{not parsed}"],
    ["{not parsed} {also not parsed}"],
    ["{*not parsed*}"],
    ["{{{not parsed}}}"],
    ["{\\{no escape\\}}"],
    ["{{ {optional inner space for delimiting} }}"],
    [">!spoiler!<"],
    [">!spoiler\nspanning lines!<"],
    ["\\>!escaped spoiler!\\<"],
    [">\\!escaped spoiler\\!<"],
  ])("parse(%p)", (text) => {
    const parsed = parse(text);

    describe(".tree", () => {
      it("matches the snapshot", () => {
        expect(parsed.tree).toMatchSnapshot();
      });
    });
  });
});
