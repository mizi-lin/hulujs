import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import commands from './commands/index.js';

export const run = () => {
    ['SIGINT', 'SIGTERM'].forEach((sig) => {
        process.on(sig, function () {
            process.exit(0);
        });
    });

    console.log('ooOoo', hideBin(process.argv));

    return yargs(hideBin(process.argv)).command(commands).showHelpOnFail(true).demandCommand().argv;
};
