import { hideBin } from 'yargs/helpers';
import cmds from './commands/index.js';
import yargs from 'yargs';

export const run = () => {
    const arg = hideBin(process.argv);
    const cli = yargs(arg);

    ['SIGINT', 'SIGTERM'].forEach((sig) => {
        process.on(sig, function () {
            process.exit(0);
        });
    });

    process.on('SIGINT', () => {
        process.kill(process.pid);
    });

    cmds.forEach(({ command, aliases, describe, builder, handler }) => {
        cli.command([command, ...aliases], describe, builder, handler);
    });

    /**
     * 悲剧 yargs commandDir 不支持 esm
     */
    // return yargs(hideBin(process.argv)).command(commands).showHelpOnFail(true).demandCommand().argv;

    console.log(cmds);
};
