import path from "node:path";
import { Readable } from "node:stream";
import { describe, expect, test } from "vitest";
import handler from "../src/handler.mjs";

const dirname = import.meta.dirname;

describe("handler", () => {
  test("it reads from a file", async () => {
    const filename = path.join(dirname, "file.test.txt");
    const result = await handler(filename, null);
    expect(result).toMatchSnapshot();
  });

  test("it reads from stdin", async () => {
    const stdin = Readable.from("# stdin");
    const result = await handler(undefined, stdin);
    expect(result).toMatchSnapshot();
  });
});
