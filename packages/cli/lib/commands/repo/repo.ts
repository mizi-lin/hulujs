import { Arguments } from 'yargs';
import { $log } from '@hulujs/core';
import stepEnv from './step-env.js';
import stepRepo from './step-repo.js';
import stepGit from './step-git.js';
import stepCompiler from './step-compiler.js';
import stepPackageInstall from './step-package-install.js';
import path from 'path';

/**
 * 初始化葫芦系统, 创建 hulu init
 * hulu repo 指 hulu project 运行的环境
 * 包括 eslint, prettier, stylelint, husky 等环境配置
 */
export const command = 'repo [dirname]';
export const aliases = ['create'];
export const describe = 'hulu repo 创建标准的葫芦项目';
export const builder = (yargs: any) => {
    return yargs
        .usage(`hulu repo 创建标准的葫芦项目`)
        .option('select', {
            type: 'boolean',
            alias: 's',
            description: '按需'
        })
        .demandCommand(0)
        .example('hulu repo', '创建葫芦项目')
        .example('hulu create', '创建葫芦项目')
        .showHelpOnFail(true);
};

export const handler = async function (argv: Arguments<Record<string, any>>) {
    const { dirname } = argv;

    $log.start([
        'hulu repo',
        '创建标准的葫芦项目',
        '---',
        '默认安装工程化辅助工具，如 eslint, stylelint, pritter等',
        '若需要按需安装',
        '请使用命令 "hulu repo -s" or "hulu repo --select" 进行按需安装'
    ]);

    $log.start('正在检测当前环境');
    await stepEnv();

    $log.start('正在配置编译器');
    const compiler = await stepCompiler();

    $log.start('正在创建项目');
    const projectPath = await stepRepo({ compiler, dirname });

    $log.start('正在安装包');
    await stepPackageInstall(projectPath);

    $log.start('正在初始化Git信息');
    await stepGit(projectPath);

    $log.success(`Hulu Repo 创建成功`);
    const relative = path.relative(process.cwd(), projectPath);

    $log.end(['命令结束', '可以使用命令启动开发环境', `white::cd ${relative} && hulu dev`]);
};
