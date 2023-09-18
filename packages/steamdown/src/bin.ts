import parse from "./index.js";
import { readFileSync } from "fs";

const inputArg = process.argv[2];

if (inputArg && inputArg !== "-") {
  const input = readFileSync(inputArg, "utf8");
  console.log(await parse(input));
} else {
  process.stdin.on("data", async (data) => {
    console.log(await parse(data.toString()));
  });
}
