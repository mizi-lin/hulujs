import { hideBin } from 'yargs/helpers';
import cmds from './commands/index.js';
import yargs from 'yargs';
import pkg from '../../cli/package.json';

export const run = () => {
    const arg = hideBin(process.argv);
    const cli = yargs(arg);

    /**
     * 信号异常退出
     */
    ['SIGINT', 'SIGTERM'].forEach((sig) => {
        process.on(sig, function () {
            process.exit(process.pid);
        });
    });

    console.log(pkg);

    /**
     * 在esm下，不能直接使用commandDir
     * 模拟commandDir使用方式调用
     */
    cmds.forEach(({ command, aliases, describe, builder, handler }) => {
        cli.command([command, ...aliases], describe, builder, handler);
    });

    cli.version('1.0.0').alias('h', 'help').alias('v', 'version').parse();
};
