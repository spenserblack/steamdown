# Steamdown

A Markdown-like language that renders to Steam's markup language.

## Differences from Markdown

This language should be familiar to anyone who has used Markdown, but there are some key
differences. This section acts as a sort of "cheat sheet" for those who are already
familiar with Markdown and just want to know what's different.

### Added syntax

#### Spoilers

Some sites support this syntax, so it might be familiar to you, but it's not part of
the original Markdown spec.

You can spoiler text by wrapping it in `>!` and `!<`.

##### Example

###### Input

```
>!This is a spoiler!<
```

###### Output

```
[spoiler]This is a spoiler[/spoiler]
```

#### Noparse

Steam has the `[noparse]` tag, which causes any text inside it to be rendered as plain
text. Steamdown supports this in both an inline and block form.

##### Examples

###### Input

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

###### Output

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

### Changed syntax

#### Blockquotes

Some Markdown renders allow you to use `>text` (no space after the `>`) to create a
blockquote. To avoid conflicts with spoiler text, a space is required after the `>` in
Steamdown.

In Steamdown, quotes can also have an author, with an optional post ID, by adding
`(author;post ID)` after the quote. Quotes are *not* continued on newlines to avoid
syntax conflicts.

##### Examples

###### Input

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

###### Output

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

### Removed syntax

#### Images (`![alt text](url)`)

Steam doesn't have an equivalent (the closest is `[url=link]text[/url]`), so images
are not supported. Consider using either links `[alt text](url)` or the plain-text link
instead.

#### Inline code (`` `code` ``)

Steam seems to render all `[code]` tags as blocks, so inline code is not supported.
Consider using a code block instead.
