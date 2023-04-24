import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import commands from './commands';

export const run = () => {
    ['SIGINT', 'SIGTERM'].forEach((sig) => {
        process.on(sig, function () {
            process.exit(0);
        });
    });

    return yargs(hideBin(process.argv)).command(commands).showHelpOnFail(true).demandCommand().argv;
};
