import { expect, test } from "vitest";
import { parse, render } from "../src/index";

/**
 * Community-provided tests for expected behavior. Add your test cases here.
 *
 * @type [issueTitle: number | string, input: string, expected: string][]
 */
const feedback: [string | number, string, string][] = [
  // Example
  ["Example", "*Hello, World!*", "[i]Hello, World![/i]"],
  [291, "![Wikipedia](https://example.com/example.jpg)", "[img]https://example.com/example.jpg[/img]"],
  [291, "[![Wikipedia](https://example.com/example.jpg)](https://example.com/example.jpg)", "[url=https://example.com/example.jpg][img]https://example.com/example.jpg[/img][/url]"],
  [293, "test_underscore_test", "test_underscore_test"],
  [293, "underscore_test_", "underscore_test_"],
  ["Fenced code block with a language tag", "```js\nconst x = 1;\n```", "[code]\nconst x = 1;\n[/code]"],
  ["Fenced code block without a language tag still works", "```\nconst x = 1;\n```", "[code]\nconst x = 1;\n[/code]"],
];

// -------------------------------------------------------------------------------------

/** @type [title: string, input: string, expected: string][] */
const tests = feedback.map(([title, ...test]) => [
  typeof title === "number" ? `Issue #${title}` : title,
  ...test,
]);

test.each(tests)("%s", (_title, input, expected) => {
  const [tree, context] = parse(input);
  const rendered = render(tree, context);
  expect(rendered).toBe(expected);
});

test("an unterminated fence with a long info string does not blow up (ReDoS)", () => {
  // A run of backticks followed by non-newline chars and no closing newline is the
  // worst case for the fence regex. The info-string class must not overlap the
  // backtick run, or matching is quadratic. 200k chars finishes in ms when linear.
  const input = "`".repeat(200_000) + "x".repeat(200_000);
  const start = process.hrtime.bigint();
  parse(input);
  const elapsedMs = Number(process.hrtime.bigint() - start) / 1e6;
  expect(elapsedMs).toBeLessThan(1000);
});
