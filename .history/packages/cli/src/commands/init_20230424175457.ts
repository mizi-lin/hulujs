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
        .command(
            'init',
            'hulu init',
            (yargs) => {
                console.log('... init');
                return yargs.example([
          // 辅助指南，终端输出的可以看到
          ['$0 measure  "src/pages/desk/measures.js"', '测试该测量文件'],
          ['$0 m src/pages/desk/measures.js -r', '测试该测量文件及下层文件【递归往下找】'],
          ['$0 m src/pages/project/components/sprint/plan/measure.js --allow-ignore=false', '强行测量处于忽略清单的文件'],
        ]);.alias('i', 'init').argv;
            },
            (argv) => {
                console.log(':::--->>>', argv);
            }
        )
        .demandCommand(0)
        .parse();
