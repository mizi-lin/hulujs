import { LogMessageOptions, log, outro } from '@clack/prompts';
import { upArray } from '@hulu/mu';
import chalk from 'chalk';

export class Log {
    t(message: string | string[]) {
        const content = upArray(message);
        return content.map((text) => {
            if (!/::/.test(text)) return text;
            const [color, content] = text.split('::');
            return chalk[color]?.(content) ?? content;
        });
    }

    text(message: string | string[]) {
        return this.t(message).join('\n');
    }

    start(message: string | string[]) {
        const content = this.t(message).map((txt, i) => {
            return chalk[i ? 'grey' : 'cyan'](txt);
        });

        const content$1 = content.join('\n');
        return log.step(content$1);
    }

    step(message: string | string[]) {
        return log.step(this.text(message));
    }

    end(message: string | string[]) {
        return outro(this.text(message));
    }

    info(message: string | string[]) {
        return log.info(this.text(message));
    }

    message(message: string | string[]) {
        return log.message(this.text(message));
    }

    success(message: string | string[]) {
        return log.success(this.text(message));
    }

    warn(message: string | string[]) {
        return log.warn(this.text(message));
    }

    warning(message: string | string[]) {
        return log.warning(this.text(message));
    }

    error(message: string | string[]) {
        return log.error(this.text(message));
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
