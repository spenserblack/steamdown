const greeting = require("../src/index").default;

test("greeting", () => {
  expect(greeting()).toBe("Hello, world!");
});
