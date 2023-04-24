import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export const run = () => {
    ['SIGINT', 'SIGTERM'].forEach((sig) => {
        process.on(sig, function () {
            process.exit(0);
        });
    });

    console.log('ooOoo', hideBin(process.argv));

    /**
     * 悲剧 yargs commandDir 不支持 esm
     */

    return yargs(hideBin(process.argv)).command(commands).showHelpOnFail(true).demandCommand().argv;
};
