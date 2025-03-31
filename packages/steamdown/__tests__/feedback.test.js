const { parse, render } = require("../dist");

/**
 * Community-provided tests for expected behavior. Add your test cases here.
 *
 * @type [issueTitle: number | string, input: string, expected: string][]
 */
const feedback = [
  // Example
  ["Example", "*Hello, World!*", "[i]Hello, World![/i]"],
  [291, "![Wikipedia](https://example.com/example.jpg)", "[img]https://example.com/example.jpg[/img]"],
  [291, "[![Wikipedia](https://example.com/example.jpg)](https://example.com/example.jpg)", "[url=https://example.com/example.jpg][img]https://example.com/example.jpg[/img][/url]"],
  [293, "test_underscore_test", "test_underscore_test"],
  [293, "underscore_test_", "underscore_test_"],
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
