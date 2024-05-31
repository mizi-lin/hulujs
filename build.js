#!/usr/bin/env node

import path from 'path';
import { copy, readJSON, writeJSON } from 'fs-extra/esm';
import { writeFile } from 'fs/promises';

const pwd = process.cwd();
const filename = pwd.split(path.sep).at(-1);
const project = `@hulujs/${filename}`;
const outDirs = path.resolve(pwd, `../../dist/${project}`);
// const outDirs = path.resolve(pwd, `./dist`);
const pkgPath = path.join(pwd, 'package.json');
const targetPkgPath = path.join(outDirs, 'package.json');

const pkg = await readJSON(pkgPath);
const { main, module } = pkg;

delete pkg.private;

if (main) {
    pkg.main = main.replace(/\.ts$/, '.js');
}

if (module) {
    pkg.module = module.replace(/\.ts$/, '.js');
}

await writeJSON(targetPkgPath, pkg);

/**
 * 写入空白的yarn.lock 用于link
 **/
await writeFile(path.join(outDirs, 'yarn.lock'), '');

// copy package
// await copy(pkgPath, targetPkgPath);
