import { Arguments } from 'yargs';

/**
 * 根据codemod代码模版生成代码模块
 */

export const command = 'init';
export const aliases = ['i'];
export const describe = 'hulu init 初始化配置';
export const builder = (yargs: any) => {
    return yargs
        .usage(`hulu genenate 根据codemod代码模版生成代码模块`)
        .demandCommand(0)
        .example('hulu genenate', '葫芦系统初始化')
        .example('hulu init', '葫芦系统初始化')
        .showHelpOnFail(true);
};

export const handler = async function (argv: Arguments<Record<string, any>>) {
    console.log('hulu init');
};
