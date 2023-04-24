import { hideBin } from 'yargs/helpers';
import cmds from './commands/index.js';
import yargs from 'yargs';

export const run = () => {
    const arg = hideBin(process.argv);
    const cli = yargs(arg);

    ['SIGINT', 'SIGTERM'].forEach((sig) => {
        process.on(sig, function () {
            process.exit(process.pid);
        });
    });

    process.on('SIGINT', () => {
        process.kill(process.pid);
    });

    /**
     * 在esm下，不能直接使用commandDir
     * 模拟commandDir使用方式调用
     */
    cmds.forEach(({ command, aliases, describe, builder, handler }) => {
        cli.command([command, ...aliases], describe, builder, handler);
    });

    cli.parse();
};
