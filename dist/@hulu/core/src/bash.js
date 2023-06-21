import { upArray } from '@hulu/mu';
import live from 'shelljs-live';
import { shell } from './msc.js';
export class Bash {
    live(command, config = {}) {
        live(upArray(command).join('\n'), config);
    }
    exec(commands, config = {}) {
        const { type, ...options } = config;
        const commands$str = upArray(commands).join('\n');
        const { stdout } = shell.exec(commands$str, { silent: true, ...options });
        const result = stdout?.trim?.()?.split?.('\n');
        if (type === 'line')
            return result?.[0];
        if (type === 'parse')
            return JSON.parse(stdout);
        return stdout;
    }
}
export const $bash = new Bash();
