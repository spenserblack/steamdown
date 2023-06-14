import parse from "./index";
import { readFileSync } from "fs";

const inputArg = process.argv[2];

if (inputArg && inputArg !== "-") {
  const input = readFileSync(inputArg, "utf8");
  console.log(parse(input));
} else {
  process.stdin.on("data", (data) => {
    console.log(parse(data.toString()));
  });
}
