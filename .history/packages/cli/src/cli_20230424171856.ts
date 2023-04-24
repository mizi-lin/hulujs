import { hideBin } from 'yargs/helpers';
import init from './commands/init.js';

export const run = () => {
    ['SIGINT', 'SIGTERM'].forEach((sig) => {
        process.on(sig, function () {
            process.exit(0);
        });
    });

    /**
     * 悲剧 yargs commandDir 不支持 esm
     */
    // return yargs(hideBin(process.argv)).command(commands).showHelpOnFail(true).demandCommand().argv;

    init();
};
