#!/usr/bin/env node

import path from 'path';
import { copy, readJSON, writeJSON } from 'fs-extra/esm';

const pwd = process.cwd();
const filename = pwd.split(path.sep).at(-1);
const project = `@hulujs/${filename}`;
const outDirs = path.resolve(pwd, `../../dist/${project}`);
const pkgPath = path.join(pwd, 'package.json');
const targetPkgPath = path.join(outDirs, 'package.json');

const pkg = await readJSON(pkgPath);
const { main, module } = pkg;

if(main) {
    pkg.main = main.replace(/\.ts$/, '.js');
}

if(module) {
    pkg.module = module.replace(/\.ts$/, '.js');
}

await writeJSON(targetPkgPath, pkg);

// copy package
// await copy(pkgPath, targetPkgPath);