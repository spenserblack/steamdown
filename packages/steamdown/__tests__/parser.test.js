const { RootParser } = require('../src/parser');

describe('RootParser', () => {
  describe('.defaultParser()', () => {
    const parser = RootParser.defaultParser();
    describe('.parse()', () => {
      test.each([["Hello, World!"], ["Foo\n\nBar"]])('should parse %p', (text) => {
        const [parsed,] = parser.parse(text);
        expect(parsed).toMatchSnapshot();
      })
    })
  })
});
