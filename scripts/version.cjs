#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

const run = () => {
  const version = process.argv[2];

  if (!version) {
    console.error(`usage: node ${__filename} <version>`);
    return 1;
  }

  const packages = path.resolve(root, "packages");

  fs.readdirSync(packages).forEach((pkg) => {
    const manifest = path.resolve(packages, pkg, "package.json");
    const data = JSON.parse(fs.readFileSync(manifest, "utf8"));
    data.version = version;
    fs.writeFileSync(manifest, JSON.stringify(data, null, 2) + "\n");
  });

  return 0;
};

process.exit(run());
