import { describe, expect, test } from "vitest";
import { UnreachableError } from "../src/parser/errors";

describe("parser", () => {
  describe("errors", () => {
    describe("UnreachableError", () => {
      const tests: [name: string, args: [] | [string], expected: string][] = [
        ["no args", [], "Unreachable"],
        ["with args", ["Unexpected branch"], "Unexpected branch"]
      ];
      test.each(tests)("%s", (_name, args, expected) => {
        const error = new UnreachableError(...args);
        expect(error.message).toBe(expected);
      });
    });
  });
});
