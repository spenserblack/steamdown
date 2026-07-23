import fs from "node:fs";
import path from "node:path";

const testExt = /\.test\.txt$/;

const assets = fs
  .readdirSync(__dirname)
  .filter((filename) => testExt.test(filename))
  .map(async (filename) => {
    const filepath = path.join(__dirname, filename);
    const name = filename.replace(testExt, "");
    const content = fs.promises.readFile(filepath, "utf-8");
    return {
      path: filepath,
      name,
      content: await content,
    };
  });

/**
 * Get all assets in this directory.
 */
const useAssets = async () => {
  return await Promise.all(assets);
};

export default useAssets;
