import type { marked } from 'marked';

export type MarkedToken = marked.Token;
export type GenericToken = marked.Tokens.Generic;
export type StrongToken = marked.Tokens.Strong;
export type HrToken = marked.Tokens.Hr;
export type TokensList = marked.TokensList;
export type Extension = NonNullable<marked.MarkedExtension['extensions']>[number];
