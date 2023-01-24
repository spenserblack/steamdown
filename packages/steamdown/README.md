# [steamdown][demo]

[![npm](https://img.shields.io/npm/v/steamdown)](https://www.npmjs.com/package/steamdown)
![npm](https://img.shields.io/npm/dt/steamdown)
[![CI](https://github.com/spenserblack/steamdown/actions/workflows/ci.yml/badge.svg)](https://github.com/spenserblack/steamdown/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/spenserblack/steamdown/branch/main/graph/badge.svg?token=aclgMScPvh)](https://codecov.io/gh/spenserblack/steamdown)

Converts Markdown to [Steam's markup][format].

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
cat file.md | steamdown

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
