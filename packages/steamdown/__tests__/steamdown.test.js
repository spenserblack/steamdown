const { parse, render } = require("../dist");
const useAssets = require('./assets');

describe("steamdown", () => {
  const assets = useAssets();
  test.each(assets)("$name", async ({ content }) => {
    const { tree, context } = parse(await content);
    const rendered = render(tree, context);
    expect(rendered).toMatchSnapshot();
  });

  test.each([
    ["bold ending in italics (#233)", "**bold ending in *italics***", "[b]bold ending in [i]italics[/i][/b]"],
    ["bold beginning with italics (#233)", "***italics* and bold**", "[b][i]italics[/i] and bold[/b]"],
    ["italics containing bold (#233)", "*italics **bold** italics*", "[i]italics [b]bold[/b] italics[/i]"],
  ])("%s", (_name, input, expected) => {
    const { tree, context } = parse(input);
    const rendered = render(tree, context);
    expect(rendered).toBe(expected);
  });
});
