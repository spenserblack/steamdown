import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { describe, test, expect } from '@jest/globals';
import render from '../src/index';

describe('parse spec', () => {
  const tests = ['basic'].map((name) => [name]);
  test.each(tests)('%s', async (name: string) => {
    const path = resolve(__dirname, './input', `${name}.md`);
    const src = await readFile(path, 'utf8');
    expect(render(src)).toMatchSnapshot();
  });
});
