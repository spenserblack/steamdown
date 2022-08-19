import { readFileSync } from 'fs';
import { createInterface } from 'readline';
import parse from './index';

const inputArg = process.argv[2];

if (inputArg && inputArg !== '-') {
  const input = readFileSync(inputArg, 'utf8');
  console.log(parse(input));
} else {
  const readline = createInterface({
    input: process.stdin,
  });

  readline.on('line', (line) => {
    console.log(parse(line));
  });
}
