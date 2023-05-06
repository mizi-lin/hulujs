import { LogMessageOptions, log, outro } from '@clack/prompts';
import { upArray } from '@hulu/mu';
import chalk from 'chalk';
import { isUnicodeSupported } from './msc.js';

export class Log {
    t(message: string | string[]) {
        const content = upArray(message);
        return content.map((text) => {
            if (!/::/.test(text)) return text;
            const [color, content] = text.split('::');
            return chalk[color]?.(content) ?? content;
        });
    }

    text(message: string | string[], isStep: boolean = true) {
        const unicode = isUnicodeSupported();
        const s = (c: string, fallback: string) => (unicode ? c : fallback);
        const S_BAR = s('│', '|');
        const message$1 = upArray(message).map((msg, i) => (i && !/::/.test(msg) ? `grey::${msg}` : msg));
        return this.t(message$1).join(isStep ? `\n${chalk.gray(S_BAR)}  ` : '\n   ');
    }

    start(message: string | string[]) {
        const content = this.t(message).map((txt, i) => {
            return chalk[i ? 'grey' : 'cyan'](txt);
        });

        const content$1 = content.join('\n');
        return log.step(content$1);
    }

    step(message: string | string[]) {
        return log.step(this.text(message, false));
    }

    end(message: string | string[]) {
        return outro(this.text(message, false));
    }

    info(message: string | string[]) {
        return log.info(this.text(message, false));
    }

    message(message: string | string[]) {
        return log.message(this.text(message, false));
    }

    success(message: string | string[]) {
        return log.success(this.text(message, false));
    }

    warn(message: string | string[]) {
        return log.warn(this.text(message, false));
    }

    warning(message: string | string[]) {
        return log.warning(this.text(message, false));
    }

    error(message: string | string[]) {
        return log.error(this.text(message, false));
    }

    emptyLine(lineNumber: number = 1) {
        Array(lineNumber)
            .fill('')
            .forEach(() => {
                log.message('');
            });
    }
}

const $log = new Log();

export { $log };
