# Steamdown Guide

Steamdown has two goals which are sometimes in conflict:

- Provide a Markdown-like syntax that targets [Steam's markup format][steam-markup].
- Provide interoperability between *existing* Markdown formats and
  [Steam][steam-markup].

These goals might sound like they're the same thing. What makes them different, and in
conflict, is that not all [Steam markup features][steam-markup] have an equivalent in
common Markdown formats, and not all common Markdown features have an equivalent in
Steam.

If you want your Steamdown site to be compatible with and render nicely with software
that supports Markdown, you may need to avoid using some Steam-specific features.
Conversely, if you want to make full use of all of the markup features available on
Steam, you may need to accept that your document *won't* render nicely with software
that supports Markdown.

## Syntax

This section explains the syntax of Steamdown and provides examples. It will start with
*unique* syntax not included in well-known Markdown formats, then *modified* syntax that
exists in common Markdown formats but may behave differently, followed by *removed*
syntax that is available in common Markdown formats but *not* Steamdown, and then
finally *interoperable* syntax that is identical (or nearly identical) to common
Markdown formats.

### Unique syntax

#### noparse

Steam supports `[noparse]`, which causes its contents to be rendered literally. In
Steamdown, this exists in two forms:

- block.
- inline.

Noparse blocks are started with three or more `{` on their own line, and ended with a
matching number of `}` on their own line. Inline noparse is similar, except you only
need to start with *one* or more `{` and a matching number of closing `}`, and do *not*
start and end on their own line.

##### Examples

```
{{{
This is a block-level noparse block. On Steam, tags like [b]bold[/b] and
[u]underline[/u] will NOT be parsed and rendered, but will be displayed as their literal
text.
}}}

This is an {inline noparse}.
```

#### spoilers

Spoilers are supported on some sites, like Reddit, but aren't available in Markdown
specifications like [CommonMark][common-mark] or [GFM][github-flavored-markdown].

These are written inline, starting with `>!` and ending with `!<`.

##### Example

```
>!This text will be hidden until a user hovers over it.!<
```

#### underlines

Underlines are written inline, starting and ending with `__` (two underscores). Note
that this syntax *conflicts with most Markdown formats,* where `__` is bold just like
`**`.

##### Example

```
__This text will be underlined.__
```

### Modified syntax

#### Code blocks

Code blocks are started with three or more `` ` `` on their own line, and ended with a
matching number of `` ` `` on their own line. Code blocks do support a language
identifier after the opening ```` ``` ````, but Steam does not support code languages,
so this identifier is *ignored.*

##### Examples

````markdown
```
This will be rendered as a code block in Steam.
```

```javascript
const x = "This will not have JavaScript syntax highlighting in Steam.";
```
````

#### Images

Images are identical to [CommonMark][common-mark]. However, alt text will be *ignored,*
as Steam does not appear to support it.

##### Example

```markdown
![this alt text is dropped](https://example.com/example.png)
```

#### Quotes

Each line of a quote is started by a `>` followed by a space. Unlike some Markdown
formats, like [GFM][github-flavored-markdown], the following space *is required.* This
is to help avoid conflicts with the spoiler syntax. Additionally, some Markdown formats
allow quoted text to be wrapped with a newline, making the `> ` in the following lines
optional, but Steamdown *requires* each quoted line to start with `> `. The reason for
this is that Steamdown also supports authors, which are optionally documented *after*
quoted text on a new line with no leading `> `. A quoted author's name is placed inside
parentheses, and may have an optional post ID by following the author's name with a `;`
and a number.

##### Example

```
> This is quoted text.

> This is quoted text with an author.
(Cool Guy)

> This is quoted txt with an author and a post ID. This can help readers follow a
> conversation even if the quoted author changes their display name.
(Your Friend;123)
```

#### Tables

Tables are not part of the [CommonMark specification][common-mark], but it is a common
Markdown extension, and part of [GFM][github-flavored-markdown]. Unlike Markdown tables,
Steam does *not* support specifying left-, right-, and center-aligned columns. What
Steam *does* support is the `equalcells` attribute and the `noborder` attribute. It
should be noted that these attributes *do not* seem to be supported in all contexts.
These attributes may not be available in Steam discussions, for example.

Tables are separated into three sections:

1. The header row.
2. The attributes row.
3. Data rows.

A row is made up of cells, and each cell has a `|` on its left and right side.

The attributes row controls `equalcells` and `noborder`. A bordered table will have a
line made up of `-` (resembling Markdown tables), or ` ` (spaces) for no border. To
activate `equalcells`, surround the `-` or ` ` with `:`, which resembles centered
columns in Markdown tables.

In a table with multiple columns, *only the first cell in the attribute row matters.*
Making the other cells in the attribute row match is purely a formatting choice.

##### Examples

Standard tables:

```markdown
| header 1 | header 2 |
| -------- | -------- |
|   data   |   data   |
|   data   |   data   |
```

`equalcells` tables:

```
| header 1 | header 2 |
| :------: | :------: |
|   data   |   data   |
|   data   |   data   |
```

`noborder` tables:

```
| header 1 | header 2 |
|          |          |
|   data   |   data   |
|   data   |   data   |
```

`equalcells` *and* `noborder` tables:

```
| header 1 | header 2 |
| :      : | :      : |
|   data   |   data   |
|   data   |   data   |
```

Note that the examples here have padded cells with equal width only to be more readable
in plain-text. Cells do not need to be aligned to be valid.

### Removed syntax

#### Inline code

Steam does not appear to support inline code. `[code]inline[/code]` will render as a
block, not inline with the rest of the text. For this reason, `` `inline code` `` has
been disabled.

##### Example

```
`This is not inline code.`
```

#### Italics with `_`

In [CommonMark][common-mark], italics may be opened and closed with a single `_`.
Because Steamdown uses `__` for underlines, italics with `_` have been *disabled* to
emphasize that underscores behave differently from Markdown.

##### Example

```
_This is not italicized._
```

[common-mark]: https://commonmark.org/
[github-flavored-markdown]: https://github.github.com/gfm/
[steam-markup]: https://steamcommunity.com/comment/Guide/formattinghelp
