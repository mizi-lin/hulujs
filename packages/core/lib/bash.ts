import { upArray } from '@hulujs/mu';
import { ExecOptions } from 'shelljs';
import live from 'shelljs-live';
import { shell } from './msc.js';

interface BachExecOptions extends ExecOptions {
    type?: 'none' | 'line' | 'parse';
}

export class Bash {
    live(command: string | string[], config: BachExecOptions = {}) {
        live(upArray(command).join('\n'), config);
    }

    exec(commands: string | string[], config: BachExecOptions = {}) {
        const { type, ...options } = config;
        const commands$str = upArray(commands).join('\n');
        const { stdout } = shell.exec(commands$str, { silent: true, ...options });
        const result = (stdout as string)?.trim?.()?.split?.('\n');

        if (type === 'line') return result?.[0];
        if (type === 'parse') return JSON.parse(stdout as string);

        return stdout;
    }
}

export const $bash = new Bash();
