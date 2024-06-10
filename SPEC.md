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
