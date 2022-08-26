import { readFileSync } from 'fs';
import { createInterface } from 'readline';
import parse from './index';

const inputArg = process.argv[2];

if (inputArg && inputArg !== '-') {
  const input = readFileSync(inputArg, 'utf8');
  console.log(parse(input));
} else {
  process.stdin.on('data', (data) => {
    console.log(parse(data.toString()));
  });
}
