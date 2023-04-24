#!/usr/bin/env node
import 'v8-compile-cache';

const fs = require('fs');
const path = require('path');
const cliRoot = path.join(__dirname, '..');
const cliProject = path.join(cliRoot, 'tsconfig.json');
const seedProject = path.join(process.cwd(), 'tsconfig.json');
const cliRunLocal = fs.existsSync(path.join(cliRoot, './scripts/build.sh'));
const projectTsConfig = cliRunLocal ? cliProject : seedProject;

// hulu cli 根目录位置
process.env.HULU_CLI_DIR = cliRoot;
// hulu cli 的状态: true 研发, false 生产
process.env.HULU_CLI_DEV = cliRunLocal;

if (fs.existsSync(projectTsConfig)) {
    require('ts-node').register({
        project: projectTsConfig,
        transpileOnly: true
    });
}

const proj = require(`../${cliRunLocal ? 'src' : 'es'}`);

proj.run(cliRunLocal);
