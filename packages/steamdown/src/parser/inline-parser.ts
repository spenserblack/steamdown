import * as tokens from "../lexer/inline-tokens";
import * as nodes from "./inline-nodes";
import type { Lexed } from "../lexer/inline-lexer";
import { UnreachableError } from "./errors";

const parseNode = (lexed: Lexed[]): [node: nodes.Node, remaining: Lexed[]] => {
  if (lexed.length === 0) {
    throw new UnreachableError("No tokens to parse.");
  }
  const [firstToken, firstTokenText] = lexed[0];

  switch (firstToken) {
    case tokens.text:
      return [
        { type: nodes.text, text: firstTokenText } satisfies nodes.Text,
        lexed.slice(1),
      ];
  }
  throw new UnreachableError(`Not implemented`);
};
export const parse = (lexed: Lexed[]): nodes.Node[] => {
  const nodes: nodes.Node[] = [];
  while (lexed.length > 0) {
    const [node, remaining] = parseNode(lexed);
    nodes.push(node);
    lexed = remaining;
  }
  return nodes;
};
