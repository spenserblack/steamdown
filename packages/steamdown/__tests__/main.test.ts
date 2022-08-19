import { describe, expect, test } from '@jest/globals';
import parse from '../src/index';

describe('formatting', () => {
  test.each([1, 2, 3, 4, 5, 6].map((n) => [n]))('test header level %d', (level) => {
    const header = '#'.repeat(level) + ' header';
    const expected = `[h${level}]header[/h${level}]`;

    expect(parse(header)).toBe(expected);
  });

  test('bold text', () => {
    expect(parse('**bold text**')).toBe('[b]bold text[/b]');
  });

  test('underlined text', () => {
    expect(parse('__underlined text__')).toBe('[u]underlined text[/u]');
  });

  describe('italicized text', () => {
    const tests = ['*', '_'].map((w) => [`${w}italicized text${w}`])
    test.each(tests)('%s', (src: string) => {
      expect(parse(src)).toBe('[i]italicized text[/i]');
    });
  });

  test('Strikethrough text', () => {
    expect(parse('~~strikethrough text~~')).toBe('[strike]strikethrough text[/strike]')
  });

  describe('Spoiler text', () => {
    test('simple spoiler', () => {
      expect(parse('!!!spoiler text!!!')).toBe('[spoiler]spoiler text[/spoiler]')
    });
    test('spoiler with exclamation', () => {
      expect(parse('!!!spoiler text\\!!!!')).toBe('[spoiler]spoiler text![/spoiler]')
    });
    test('exclamation outside of spoiler', () => {
      expect(parse('!!!spoiler text!!!\\!')).toBe('[spoiler]spoiler text[/spoiler]!')
    });
    test('spoiler with newlines', () => {
      expect(parse('!!!spoiler\nthis\ntext!!!')).toBe('[spoiler]spoiler\nthis\ntext[/spoiler]');
    });
  });

  describe('Literal text', () => {
    test('inline', () => {
      expect(parse('{{{[b]Not[/b] *bold*}}}')).toBe('[noparse][b]Not[/b] *bold*[/noparse]');
    });
    test('block', () => {
      expect(parse('{{{\n[b]Not[/b] *bold*\n}}}')).toBe('[noparse]\n[b]Not[/b] *bold*\n[/noparse]');
    });
  });

  describe('links', () => {
    test('simple link', () => {
      expect(parse('[link](https://example.com)')).toBe('[url=https://example.com]link[/url]');
    });
    test('image is a link', () => {
      expect(parse('![image](https://example.com/image.png)')).toBe('[url=https://example.com/image.png]image[/url]');
    });
  });

  test('code span', () => {
    expect(parse('`code`')).toBe('[code]code[/code]');
  });

  test('code block', () => {
    expect(parse('```\ncode\n```')).toBe('[code]\ncode\n[/code]');
  });

  test("text isn't escaped", () => {
    const text = "text <span>isn't</span> escaped";
    expect(parse(text)).toBe(text);
  })

  test("nested text isn't escaped", () => {
    expect(parse("text **isn't** escaped")).toBe("text [b]isn't[/b] escaped");
  })
});
