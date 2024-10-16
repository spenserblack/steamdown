# [steamdown][demo]

[![npm](https://img.shields.io/npm/v/steamdown)](https://www.npmjs.com/package/steamdown)
![npm](https://img.shields.io/npm/dt/steamdown)
[![CI](https://github.com/spenserblack/steamdown/actions/workflows/ci.yml/badge.svg)](https://github.com/spenserblack/steamdown/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/spenserblack/steamdown/branch/main/graph/badge.svg?token=aclgMScPvh)](https://codecov.io/gh/spenserblack/steamdown)

Converts Markdown to [Steam's markup][format].

**:warning: I am rewriting this project to use an internal parser instead of using extensions and custom renderers with [Marked](https://github.com/markedjs/marked). In doing so, the supported syntax will likely change slightly, because some of Markdown's syntax doesn't have an equivalent in Steam's markup. Some of Markdown's syntax will be either disabled or repurposed. For example, while URLs in Steam's markup have `[url=//example.com]text[/url]`, images don't have an equivalent, so the `![image name](//example.com/image.png)` syntax might be disabled. Tables in Steam do *not* support alignment, but *do* support the `noborder` and `equalcells` attributes, so the table syntax may *look* similar to Markdown, but serve a different purpose.**

:bow: Also, I've been slow with updates because I haven't been 100% happy with the implementations I've written. Even though they work fine, they don't feel maintainable. Instead of "hand-writing" a parser, I'm currently playing around with PEG.js/Peggy, and hopefully this will result in a maintainable parser.

## Usage

### Website

Go to http://steamdown.vercel.app/

### Library

```typescript
import parse from 'steamdown';

console.log(parse(text));
```

### CLI

```bash
# read from STDIN
steamdown -
# or
steamdown < file.md

# read from file
steamdown file.md
```

## Differences from Markdown

View the [input spec][basic input] and [output spec][snapshots] for an
example.

### Images

Images are *not* supported. They render to links. For example,
`![example](/image.png)` becomes `[url=/image.png]example[/url]`.

### Underlines (`[u]`)

Wrapping text with `__` does *not* make it bold, but makes it underlined
(`__underlined text__`).

### Spoiler Text (`[spoiler]`)

Wrapping text with `!!!` makes it spoiler text (`!!!hidden text!!!`).

### Quote Authors

Quotes can have authors by adding `(author)` after text preceded with a `>`.
For this reason, continuing a quote on a newline *without* preceding each line
with a `>` is considered undocumented behavior.

#### Example

```markdown
>this is some text that I'm
>responding to.
(some person)
```

### Literal Text (`[noparse]`)

Steam's `[noparse]` tag instructs Steam to render text like `[b]this[/b]`
literally, without styling. In addition to rendering a `[noparse]` block,
steamdown's literal text rule will also prevent parsing of the source text.
For example, `*this*` would not be converted to `[i]this[/i]`.

#### Inline

Text can be made literal by wrapping it with `{{{` and `}}}`
(`{{{[b]The bold tag is rendered[/b]}}}`).

#### Block Level

Any lines between `{{{` and `}}}` will be rendered without
any parsing.

##### Example

```markdown
{{{
[b] is bold
[u] is underline
}}}
```

## Limitations

Steam supports tables with no borders (`[table noborder=1]`) and equal-width cells
(`[table equalcells=1]`). These are not currently supported. Syntax proposals welcome!

[demo]: https://steamdown.vercel.app/
[format]: https://steamcommunity.com/comment/Guide/formattinghelp
[basic input]: /packages/steamdown/__tests__/input/basic.md
[snapshots]: /packages/steamdown/__tests__/__snapshots__/
