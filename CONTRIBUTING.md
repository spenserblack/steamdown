# Contributing

## User-provided test cases

Just discovering and reporting an issue with rendering is a great contribution! These
issues can include:

- A missing feature
- An unexpected output
- An input that breaks parsing and rendering
- And more!

A great way to help out, even if you don't intend to implement the changes yourself,
is to provide a test case. This is done by adding an entry to
[`feedback.test.js`][feedback-tests].

Just give your test a title (or pass an issue number to automatically generate a title),
provide your input, and an expected output. Generally, the tests should be simple,
as complex inputs/outputs with many elements would be difficult to write tests for. An
example test case is provided in [`feedback.test.js`][feedback-tests].

[feedback-tests]: ./packages/steamdown/__tests__/feedback.test.js
