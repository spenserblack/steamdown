const { parse, render } = require("../dist");

/**
 * Community-provided tests for expected behavior. Add your test cases here.
 *
 * @type [issueTitle: number | string, input: string, expected: string][]
 */
const feedback = [
  // Example
  ["Example", "*Hello, World!*", "[i]Hello, World![/i]"],
];

// -------------------------------------------------------------------------------------

/** @type [title: string, input: string, expected: string][] */
const tests = feedback.map(([title, ...test]) => [typeof title === "number" ? `Issue #${title}` : title, ...test]);

test.each(tests)("%s", (_title, input, expected) => {
  const [tree, context] = parse(input);
  const rendered = render(tree, context);
  expect(rendered).toBe(expected);
});
