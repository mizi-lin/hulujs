import { path, simpleGit } from '@hulu/core';
import { Arguments } from 'yargs';
import createDebug from 'debug';

const debug = createDebug('init');

/**
 * 初始化葫芦系统, 创建 hulu init
 * hulu repo 指 hulu project 运行的环境
 * 包括 eslint, prettier, stylelint, husky 等环境配置
 */

export const command = 'init';
export const aliases = ['i'];
export const describe = 'hulu init 初始化配置';
export const builder = (yargs: any) => {
    return yargs
        .usage(`hulu init 葫芦项目初始化`)
        .demandCommand(0)
        .example('hulu init | repo ', '葫芦系统初始化')
        .showHelpOnFail(true);
};

const TestRegex = () => {
    const demo = [
        'git@git-ext.mininglamp.com:yuntai/fe/mre-mts.git',
        'https://git-ext.mininglamp.com/yuntai/fe/mre-mts.git',
        'git@github.com:mizi-lin/hulujs.git',
        'https://github.com/mizi-lin/hulujs.git',
        'http://github.com/mizi-lin/hulujs.git',
        'httpss://github.com/mizi-lin/hulujs.git',
        'httpps://github.com/mizi-lin/hulujs.git'
    ];

    const regex = /^((https?:\/\/)|(git@)).*?\.git$/;

    demo.forEach((str) => {
        console.log(regex.test(str), str);
    });
};

const TestGit = async () => {
    // const remote = await $git.getRemote();
    // await $git.pull();
    // const status = await $git.status();
    // const files = (await $prompts.multiselect({
    //     message: 'aaa',
    //     options: status.not_added.map((file) => {
    //         return { label: file, value: file };
    //     })
    // })) as string[];
    // await $git.add(files);
    // console.log(await ggit.status());
};

export const handler = async function (argv: Arguments<Record<string, any>>) {
//     console.log('hulu init');

//     const git =  simpleGit();

//    const a =  await git.init();

//     console.log( a );

    const relative = path.relative(process.cwd(), '/Users/Mizi');

    console.log(relative);

    // TestRegex();

    // const yarnVersion = $ver.bin('yarn');
    // console.log('yarnVersion', yarnVersion);

    // const stdout = $bash.exec('yarn config get npmRegistryServer', { type: 'line' });
    // await TestGit();

    // debug('start');
    // const a = await tsImport.load('/Users/Mizi/minglamp/repo/fe/odemo/hulu/config.ts', {
    //     allowConfigurationWithComments: true
    // });

    // console.log(a);

    // await import('/Users/Mizi/minglamp/repo/fe/odemo/hulu/config.js');

    // debug('end');
};
