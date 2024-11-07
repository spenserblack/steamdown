const { parse, render } = require("../dist");
const useAssets = require('./assets');

describe("steamdown", () => {
  const assets = useAssets();
  test.each(assets)("$name", async ({ content }) => {
    const { tree, context } = parse(await content);
    const rendered = render(tree, context);
    expect(rendered).toMatchSnapshot();
  });
});
