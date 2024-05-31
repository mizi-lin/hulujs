#!/usr/bin/env node

import path from 'path';
import { copy, readJSON, writeJSON, outputFile } from 'fs-extra/esm';
import { readdir, writeFile } from 'fs/promises';
import shell from 'shelljs';
import { write } from 'fs-extra';

const pwd = process.cwd();

// 获取所有的子项目名称

const targetPkgPath = path.join(pwd, './dist/package.json');
const yarnLockPath = path.join(pwd, './dist/yarn.lock');
const workspaces = path.join(pwd, 'packages');
const result = await readdir(workspaces);
const names = result.map((name) => `@hulujs/${name}`);

const dependencies = names.reduce((temp, name) => {
    temp[name] = `link:./${name}`;
    return temp;
}, {});

await writeJSON(targetPkgPath, { dependencies });
await outputFile(yarnLockPath, '');

shell.exec(`
    cd ${pwd}/dist
    yarn 
`);

console.log(names);

// const filename = pwd.split(path.sep).at(-1);
// const project = `@hulujs/${filename}`;
// const outDirs = path.resolve(pwd, `../../dist/${project}`);
// // const outDirs = path.resolve(pwd, `./dist`);
// const pkgPath = path.join(pwd, 'package.json');
// const targetPkgPath = path.join(outDirs, 'package.json');

// const pkg = await readJSON(pkgPath);
// const { main, module } = pkg;

// delete pkg.private;

// if (main) {
//     pkg.main = main.replace(/\.ts$/, '.js');
// }

// if (module) {
//     pkg.module = module.replace(/\.ts$/, '.js');
// }

// await writeJSON(targetPkgPath, pkg);

// /**
//  * 写入空白的yarn.lock 用于link
//  **/
// await writeFile(path.join(outDirs, 'yarn.lock'), '');

// copy package
// await copy(pkgPath, targetPkgPath);
