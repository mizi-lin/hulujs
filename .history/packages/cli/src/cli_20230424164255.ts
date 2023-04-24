import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const run = () => {
    ['SIGINT', 'SIGTERM'].forEach((sig) => {
        process.on(sig, function () {
            process.exit(0);
        });
    });

    return yargs(process.argv.slice(2))
        .commandDir('./commands', {
            // commandDir默认只会加载目录下第一级的文件，不会递归加载, default false
            recurse: false,

            // 开发环境使用 ts，需指定
            extensions: ['js']
        })
        .showHelpOnFail(true)
        .demandCommand().argv;
};
