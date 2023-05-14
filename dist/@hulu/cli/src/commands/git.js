import { $git, $prompts } from '@hulu/core';
/**
 * 初始化葫芦系统, 创建 hulu init
 * hulu repo 指 hulu project 运行的环境
 * 包括 eslint, prettier, stylelint, husky 等环境配置
 */
export const command = 'init';
export const aliases = ['i'];
export const describe = 'hulu init 初始化配置';
export const builder = (yargs) => {
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
    const status = await $git.status();
    const files = (await $prompts.multiselect({
        message: 'aaa',
        options: status.not_added.map((file) => {
            return { label: file, value: file };
        })
    }));
    await $git.add(files);
};
export const handler = async function (argv) {
    console.log('hulu init');
    // TestRegex();
    await TestGit();
};
