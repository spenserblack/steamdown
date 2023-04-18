import type {
  Extension,
  GenericToken,
  MarkedToken,
  StrongToken,
  HrToken,
} from "./types";

export type SpoilerToken = {
  type: "spoiler";
  raw: string;
  text: string;
  tokens: MarkedToken[];
};

export type NoparseToken = {
  type: "noparse";
  raw: string;
  text: string;
};

export type NoparsespanToken = {
  type: "noparsespan";
  raw: string;
  text: string;
};

export type BlockquoteToken = {
  type: "blockquote";
  raw: string;
  tokens: MarkedToken[];
  author?: string | null | undefined;
};

const wrapped = (s: string, wrapper: string): boolean =>
  s.startsWith(wrapper) && s.endsWith(wrapper);

const space = {
  name: "space",
  renderer({ raw }: GenericToken) {
    return raw;
  },
};
const text = {
  name: "text",
  renderer({ raw }: GenericToken) {
    return raw;
  },
};

const underline = {
  name: "strong",
  renderer(token: GenericToken) {
    const { raw, text } = token as StrongToken;
    if (wrapped(raw, "__")) {
      return `[u]${text}[/u]`;
    } else if (wrapped(raw, "**")) {
      return `[b]${text}[/b]`;
    }
    return false;
  },
};

const spoiler: Extension = {
  name: "spoiler",
  level: "inline",
  start(src: string): number {
    // TODO Remove this hack once @types package is updated
    return src.match(/!!!/)?.index as number;
  },
  tokenizer(src: string): SpoilerToken | void {
    const match = src.match(/^!!!([^\n]*)!!!/);
    if (match) {
      return {
        type: "spoiler",
        raw: match[0],
        text: match[1],
        tokens: this.lexer.inlineTokens(match[1]),
      };
    }
  },
  renderer(token: GenericToken) {
    const { tokens } = token as SpoilerToken;
    return `[spoiler]${this.parser.parseInline(tokens)}[/spoiler]`;
  },
};

const noparse: Extension = {
  name: "noparse",
  level: "block",
  start(src: string): number {
    return src.match(/\{\{\{\n/)?.index as number;
  },
  tokenizer(src: string): NoparseToken | void {
    const match = src.match(/^\{\{\{\n((?:.|\n)*\n)\}\}\}\n?/);
    if (match) {
      return {
        type: "noparse",
        raw: match[0],
        text: match[1],
      };
    }
  },
  renderer(token: GenericToken) {
    const { text } = token as NoparseToken;
    return `[noparse]\n${text}[/noparse]\n\n`;
  },
};

const noparsespan: Extension = {
  name: "noparsespan",
  level: "inline",
  start(src: string): number {
    // TODO And this too
    return src.match(/\{\{\{[^\n]/)?.index as number;
  },
  tokenizer(src: string): NoparsespanToken | void {
    const match = src.match(/^\{\{\{(.*)\}\}\}/);
    if (match) {
      return {
        type: "noparsespan",
        raw: match[0],
        text: match[1],
      };
    }
  },
  renderer(token: GenericToken) {
    const { text } = token as NoparsespanToken;
    return `[noparse]${text}[/noparse]`;
  },
};

const hr = {
  name: "hr",
  renderer() {
    return "[hr][/hr]\n\n";
  },
};

const blockquote: Extension = {
  name: "blockquote",
  level: "block",
  start(src: string): number {
    return src.match(/(?:^|\n)> ?.*(?:\n|$)/)?.index as number;
  },
  tokenizer(src: string): BlockquoteToken | void {
    const match = src.match(/^((?:> ?.*(?:\n|$))+)(?:\((.*)\)(?:\n|$))?/);
    if (match) {
      const [raw, text, author] = match as [string, string, string | undefined];
      const tokens = this.lexer.blockTokens(
        text.replace(/^> ?/gm, ""),
        undefined as any,
      );
      return {
        type: "blockquote",
        raw,
        author,
        tokens,
      };
    }
  },
  renderer(token: GenericToken) {
    const { tokens, author } = token as BlockquoteToken;
    const parsed = this.parser.parse(tokens);
    return `[quote${author ? `=${author}` : ""}]${parsed}[/quote]\n\n`;
  },
};

const extensions: Extension[] = [
  space,
  // text,
  underline,
  spoiler,
  noparse,
  noparsespan,
  hr,
  blockquote,
];

export default extensions;
