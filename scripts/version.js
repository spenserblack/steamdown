#!/usr/bin/env node
const { promises: { writeFile } } = require('fs');
const { resolve } = require('path');

// TODO Use a glob?
const packages = [
  'site',
  'steamdown',
];

async function main() {
  const version = process.argv[2];
  if (!version) {
    console.error('Please provide a version number');
    process.exit(1);
  }

  await Promise.all(packages.map(async (packageName) => {
    const path = resolve(__dirname, '..', 'packages', packageName, 'package.json');
    const package = require(path);
    package.version = version;
    await writeFile(path, JSON.stringify(package, null, 2) + '\n');
  }));

  console.log('Version set to', version);
  console.log("Don't forget to commit and add a tag");
}

main();
