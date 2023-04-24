import yargs, { Arguments } from 'yargs';
import { hideBin } from 'yargs/helpers';

export const command = 'init';
export const aliases = ['i'];
export const describe = 'hulu init 初始化配置';
export const builder = (yargs: any) => {
    return yargs
        .usage(`hulu init | repo 启动本地开发模式`)
        .demandCommand(0)
        .help('h')
        .example('hulu init | repo ', '葫芦系统初始化')
        .showHelpOnFail(true);
};

export const handler = async function (argv: Arguments<Record<string, any>>) {
    console.log('hulu init');
};
/**
 * 初始化葫芦系统, 创建 hulu init
 * hulu repo 指 hulu project 运行的环境
 * 包括 eslint, prettier, stylelint, husky 等环境配置
 */
yargs(hideBin(process.argv))
    .command(
        'init',
        'hulu repo init',
        () => {},
        (argv) => {
            console.log('hulu init');
        }
    )
    .demandCommand(1)
    .parse();
