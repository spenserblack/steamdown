# Steamdown

[![NPM Version](https://img.shields.io/npm/v/%40steamdown%2Fcore)](https://www.npmjs.com/package/@steamdown/core)
[![CI](https://github.com/spenserblack/steamdown/actions/workflows/ci.yml/badge.svg)](https://github.com/spenserblack/steamdown/actions/workflows/ci.yml)

Render Markdown / a Markdown-like language to Steam's markup format.

## Usage

Visit [the site][site], install `@steamdown/cli`, or use the
`@steamdown/core` library.

### Library

```typescript
import { parse, render } from "@steamdown/core";

let src: string;
const [tree, context] = parse(src);
const markup = render(tree, context);
```

## Things to be aware of

This language should be familiar to anyone who has used Markdown, but there are some key
differences. Additionally, not all of Steam's markup features are available in all text
inputs. This section describes differences from Markdown and other things you should be
aware of.

### Spoilers

Some sites support this syntax, so it might be familiar to you, but it's not part of
the original Markdown spec. You can spoiler text by wrapping it in `>!` and `!<`.

#### Example input

```
>!This is a spoiler!<
```

#### Example output

```
[spoiler]This is a spoiler[/spoiler]
```

### Underlines

Markdown typically uses underscores (`_`) for emphasis, like asterisks (`*`). This
syntax disables `_` for emphasis. Instead of treating underscores and asterisks
similarly, this syntax treats single underscores literally, and uses double underscores
(`__`) to support underlines.

#### Example input

```
__This is underlined__
```

#### Example output

```
[u]This is underlined[/u]
```

### Noparse

Steam has the `[noparse]` tag, which causes any text inside it to be rendered as plain
text. Steamdown supports this in both an inline and block form.

#### Example input

```
With noparse {[i]} will not be converted to italics.

Steamdown will also treat {*text inside noparse tags*} as plain text.

You can {{ {nest} }} inline noparse spans.

{{{
You can use noparse blocks for larger sections of text.
}}}

{{{{
{{{
You can nest noparse blocks.
}}}
}}}}
```

#### Example output

```
With noparse [noparse][i][/noparse] will not be converted to italics.

Steamdown will also treat [noparse]*text inside noparse tags*[/noparse] as plain text.

You can [noparse]{nest}[/noparse] inline noparse spans.

[noparse]
You can use noparse blocks for larger sections of text.
[/noparse]

[noparse]
{{{
You can nest noparse blocks.
}}}
[/noparse]
```

### Blockquotes

Some Markdown renders allow you to use `>text` (no space after the `>`) to create a
blockquote. To avoid conflicts with spoiler text, a space is required after the `>` in
Steamdown.

In Steamdown, quotes can also have an author, with an optional post ID, by adding
`(author;post ID)` after the quote. Quotes are *not* continued on newlines to avoid
syntax conflicts.

#### Example input

```
> quote without an author

> quote with an author
(author)

> quote with an author and post ID
(author;12345)

> quotes can continue
> on multiple lines

> quotes cannot
continue without another >
```

#### Example output

```
[quote]
quote without an author
[/quote]

[quote=author]
quote with an author
[/quote]

[quote=author;12345]
quote with an author and post ID
[/quote]

[quote]
quotes can continue
on multiple lines
[/quote]

[quote]
quotes cannot
[/quote]

continue without another >
```

### Tables

Steam does *not* support cell alignment. It does, however, support `equalcells=1` and
`noborder=1`, but apparently not for normal users. For `noborder=1`, use spaces instead
of `-` in the alignment row. For `equalcells=1`, use `:---:` in the alignment row, as
if you were centering a column in normal Markdown. "Alignment row" isn't really accurate
for Steamdown, though, so it should perhaps be called the "attribute row".

#### Examples

In the following examples, it should be noted that the "Attribute row" affects the
*entire table,* not just a column. For this reason, the first cell in an attribute row
takes precedence, and the following only need to be the same for clearer plain-text.

##### "Plain" table

```
| one | two |
| --- | --- |
|  a  |  b  |
```

##### `noborder=1` table

```
| one | two |
|     |     |
|  a  |  b  |
```

**NOTE:** Omitting the left and right `|` was considered as a better visual
representation of no borders, but was decided against because it could cause issues with
tables that are 1 cell wide.

##### `equalcells=1` table

```
| one | two |
| :-: | :-: |
|  a  |  b  |
```

##### Both `noborder=1` and `equalcells=1` table

```
| one | two |
| : : | : : |
|  a  |  b  |
```

### Images

Images are rendered as `[img]https://example.com/image.png[/img]` blocks. These are
*not* available in all contexts. They are available in contexts like Guides and Workshop
descriptions. In other contexts, like Discussions, you may want to simply paste the
link. Additionally, as you may have noticed from the `[img]` block, alt text is not
used.

### Inline code (`` `code` ``)

Steam seems to render all `[code]` tags as blocks, so inline code is not supported.
Consider using a code block instead.

[site]: https://steamdown.vercel.app/
