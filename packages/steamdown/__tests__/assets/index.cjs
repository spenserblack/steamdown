const fs = require("node:fs");
const path = require("node:path");

const testExt = /\.test\.txt$/;

// TODO Make this async so the files aren't read one by one
const assets = fs
  .readdirSync(__dirname)
  .filter((filename) => testExt.test(filename))
  .map((filename) => {
    const filepath = path.join(__dirname, filename);
    const name = filename.replace(testExt, "");
    const content = fs.promises.readFile(filepath, "utf-8");
    return {
      path: filepath,
      name,
      content,
    };
  });

/**
 * Get all assets in this directory.
 */
const useAssets = () => {
  return assets;
};

module.exports = useAssets;
