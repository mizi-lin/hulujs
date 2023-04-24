import yargs, { Arguments } from 'yargs';
import { hideBin } from 'yargs/helpers';

// export const command = 'init';
// export const aliases = ['i'];
// export const describe = 'hulu init 初始化配置';
// export const builder = (yargs: any) => {
//     return yargs
//         .usage(`hulu init | repo 启动本地开发模式`)
//         .demandCommand(0)
//         .help('h')
//         .example('hulu init | repo ', '葫芦系统初始化')
//         .showHelpOnFail(true);
// };

// export const handler = async function (argv: Arguments<Record<string, any>>) {
//     console.log('hulu init');
// };

/**
 * 初始化葫芦系统, 创建 hulu init
 * hulu repo 指 hulu project 运行的环境
 * 包括 eslint, prettier, stylelint, husky 等环境配置
 */
export default () =>
    yargs(hideBin(process.argv))
        // .command(
        //     'init',
        //     'hulu init',
        //     (yargs) => {
        //         console.log('... init');
        //         yargs.alias({ i: 'init' });
        //     },
        //     (argv) => {
        //         console.log(':::--->>>', argv);
        //     }
        // )
        .command({
            command: 'clean',
            aliases: ['c'],
            desc: '删除数据源文件',
            builder: function (yargs) {
                return yargs
                    .options({
                        src: {
                            alias: 'path',
                            describe: '删除的资源路径',
                            string: true
                        }
                    })
                    .demandOption(
                        ['src', 'path'],
                        '请传入要删除的路径！相对于项目根路径，比如: sitespeed-result/docker-test/2022-08-22'
                    ) // 强制某个参数为必填，不如check灵活
                    .usage('$0 clean --path ')
                    .example([
                        [
                            '$0 clean --path sitespeed-result/docker-test/2022-08-18/12-25-46_1580d24f-4d01-4155-ad22-bd3b8305f73d',
                            '清除指定的数据源'
                        ]
                    ]);
            },
            handler: async (argv) => {
                clean(argv?.path);
            }
        })
        .demandCommand(0)
        .parse();
