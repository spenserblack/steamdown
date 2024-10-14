import * as nodes from "../../nodes";
import { ParseError, UnreachableError } from "../../errors";
import escapeRegExp from "lodash.escaperegexp";
import { parse } from "./parsers";

/**
 * Helper for `makeWrappedTextParser`.
 */
export type WrappedNode = Exclude<nodes.Inline, nodes.Text>;

/**
 * Creates a parser for wrapped text.
 *
 * For example, `*foo*` is `foo` wrapped in `*`.
 */
export const makeWrappedTextParser = <N extends WrappedNode>(
  wrapper: string | [string, string],
  type: N["type"],
) => {
  const wrappers = typeof wrapper === "string" ? [wrapper, wrapper] : wrapper;
  const [startWrapper, endWrapper] = wrappers;
  const endRegex = new RegExp(`(?<!\\\\)${escapeRegExp(endWrapper)}`);
  return {
    hint: (text: string) => text.startsWith(startWrapper),
    parse: (text: string): [N, remainder: string] => {
      text = text.slice(wrapper.length);

      const endMatch = endRegex.exec(text);
      if (!endMatch) {
        throw new ParseError(`${type} must be closed`);
      }
      const innerEndIndex = endMatch.index;

      const innerText = text.slice(0, endMatch.index);

      if (innerText.length === 0) {
        throw new ParseError(`${type} must have content`);
      }

      if ([innerText[0], innerText[innerText.length - 1]].some((s) => /\s/.test(s))) {
        throw new ParseError(`${type} cannot start or end with whitespace`);
      }

      // TODO Unnecessary (already enforced by block parsing)?
      if (/\r?\n\r?\n/.test(innerText)) {
        throw new ParseError(`${type} cannot contain newlines`);
      }

      const remainder = text.slice(innerEndIndex + endWrapper.length);

      const nodes = parse(innerText);

      const node = {
        type,
        nodes,
      };

      return [node as N, remainder];
    },
  };
};

/**
 * Creates a helper for wrapped text for inline formatting, where the wrapper can be variable length.
 *
 * For example, both `~foo~` and `~~foo~~` would be `[strike]foo[/strike]`.
 *
 * This will return a helper that returns the text used for wrapping (`~~`) and the wrapped text.
 * It will not perform much validation besides asserting that the text is wrapped.
 *
 * # Example
 *
 * ```typescript
 * const helper = variableLengthInlineHelper("~");
 * helper("foo ~~bar~~ baz"); // { wrapper: "~~", text: "bar" }
 * ```
 */
export const variableLengthInlineHelper = (wrapperChar: string) => {
  if (wrapperChar.length !== 1) {
    throw new UnreachableError("wrapperChar must be a single character");
  }
  const regex = new RegExp(`^(?:(?!<\\\\)${escapeRegExp(wrapperChar)})+`);

  return (text: string) => {
    const wrapperMatch = regex.exec(text);
    if (!wrapperMatch) {
      return "no match";
    }
    const wrapper = wrapperMatch[0];
    const endRegex = new RegExp(`(?<!\\\\)${escapeRegExp(wrapper)}`);
    text = text.slice(wrapper.length);
    const endMatch = endRegex.exec(text);

    if (!endMatch) {
      return "not closed";
    }

    text = text.slice(0, endMatch.index);

    return { wrapper, text };
  };
};
