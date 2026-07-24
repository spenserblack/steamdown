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

##### Example

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

[common-mark]: https://commonmark.org/
[github-flavored-markdown]: https://github.github.com/gfm/
[steam-markup]: https://steamcommunity.com/comment/Guide/formattinghelp
