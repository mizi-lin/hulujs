import { log, outro } from '@clack/prompts';
import { upArray } from '@hulu/mu';
import chalk from 'chalk';
export class Log {
    t(message) {
        const content = upArray(message);
        return content.map((text) => {
            if (!/::/.test(text))
                return text;
            const [color, content] = text.split('::');
            return chalk[color]?.(content) ?? content;
        });
    }
    text(message) {
        return this.t(message).join('\n');
    }
    start(message) {
        const content = this.t(message).map((txt, i) => {
            return chalk[i ? 'grey' : 'cyan'](txt);
        });
        const content$1 = content.join('\n');
        return log.step(content$1);
    }
    step(message) {
        return log.step(this.text(message));
    }
    end(message) {
        return outro(this.text(message));
    }
    info(message) {
        return log.info(this.text(message));
    }
    message(message) {
        return log.message(this.text(message));
    }
    success(message) {
        return log.success(this.text(message));
    }
    warn(message) {
        return log.warn(this.text(message));
    }
    warning(message) {
        return log.warning(this.text(message));
    }
    error(message) {
        return log.error(this.text(message));
    }
    emptyLine(lineNumber = 1) {
        Array(lineNumber)
            .fill('')
            .forEach(() => {
            log.message('');
        });
    }
}
const $log = new Log();
export { $log };
