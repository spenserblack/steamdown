# Specification

Specification for Steamdown. This is a language that is heavily inspired by Markdown,
but has a few key differences to support Steam's formatting.

## Blocks

Blocks are the "top-level" syntax, and can contain inline text formatting.

### Paragraphs

Paragraphs are blocks of text. A paragraph is separated from another paragraph by two
newlines. Paragraphs are the fallback block if text can't be interpreted as any other
block. Single breaklines will be interpreted and rendered literally -- a paragraph
with a newline will *not* be "unwrapped" to be on one line (this may change to be an option).

```markdown
This is a paragraph. A single newline
will be interpreted literally and
continue the paragraph.

This is another paragraph.
```

Note that Steam's syntax does *not* have the concept of a paragraph block, unlike
HTML (`<p>`). The paragraph block in this project serves mostly for organization
and to encourage good formatting.

## Inlines

Inlines are contained within blocks. Inlines may also contain their own inlines.

### Italics

Italics are text wrapped within a single set of `*`. Italics *cannot* contain a newline.
Italics must start and end with a word, not a space.

```markdown
*This is italicized.*

*this is
not italicized.*

* This is not italicized. *
```

Note that, unlike Markdown, italics represented by a set of `_` are *not* supported.


### Underlines

Underlines are text wrapped within a single set of `_`. Italics *cannot* contain a newline.
Underlines must start and end with a word, not a space.

```markdown
_This text is underlined._

_this is
not underlined._

_ This is not underlined. _
```

Note that, in Markdown, this would be italicized/emphasized text, not underlined.

### Bold

Bold is text wrapped within `**`. Bold *cannot* contain a newline.
Bold must start and end with a word, not a space.

```markdown
**This text is bold.**

**this is
not bold.**

** This is not bold. **
```

### Text

Text is the fallback inline if it can't be interpreted as any other inline.
