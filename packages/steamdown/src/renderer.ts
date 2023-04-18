import type { marked } from "marked";

type Renderer = marked.RendererObject;

// HACK: Even with the `sanitize: false`, `mangle: false`, and `sanitizer: (html) => ''` options,
//       marked still escapes some characters. This is a workaround for that.
const unescapes = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
};
const unescape = (text: string) => {
  const regexp = new RegExp(Object.keys(unescapes).join("|"), "g");
  return text.replace(regexp, (match) => unescapes[match as keyof typeof unescapes]);
}

const renderer: Renderer = {
  paragraph(text: string) {
    return text;
  },
  br() {
    return "\n";
  },
  heading(text: string, level: number) {
    return `[h${level}]${text}[/h${level}]\n\n`;
  },
  em(text: string) {
    return `[i]${text}[/i]`;
  },
  del(text: string) {
    return `[strike]${text}[/strike]`;
  },
  link(href: string, _title: string, text: string) {
    return `[url=${href}]${text}[/url]`;
  },
  image(href: string, _title: string, text: string) {
    return `[url=${href}]${text}[/url]`;
  },
  list(body: string, ordered: boolean) {
    const tag = ordered ? "olist" : "list";
    return `[${tag}]\n${body}[/${tag}]`;
  },
  listitem(text: string) {
    return `    [*]${text}\n`;
  },
  code(code: string) {
    return `[code]\n${code}\n[/code]`;
  },
  codespan(code: string) {
    return `[code]${code}[/code]`;
  },
  table(header: string, body: string) {
    return `[table]\n${header}${body}[/table]\n\n`;
  },
  tablerow(content: string) {
    return `  [tr]\n${content}  [/tr]\n`;
  },
  tablecell(content: string, flags: { header: boolean }) {
    const tag = flags.header ? "th" : "td";
    return `    [${tag}]${content}[/${tag}]\n`;
  },
  text(text: string) {
    return unescape(text);
  },
};

export default renderer;
