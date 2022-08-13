import { parse } from "@steamdown/core";

export const render = (text: string): string => {
  const parsed = parse(text);
  throw new Error("Not implemented");
};
