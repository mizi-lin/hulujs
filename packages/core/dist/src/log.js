import { log, outro } from '@clack/prompts';
import { upArray } from '@hulujs/mu';
import chalk from 'chalk';
import { isUnicodeSupported } from './msc.js';
export class Log {
    static Sign = '   ';
    t(message) {
        const content = upArray(message);
        return content.map((text) => {
            if (!/::/.test(text))
                return text;
            const [color, content] = text.split('::');
            return chalk[color]?.(content) ?? content;
        });
    }
    text(message, isStep = true, sign) {
        const unicode = isUnicodeSupported();
        const s = (c, fallback) => (unicode ? c : fallback);
        const S_BAR = s('│', '|');
        const message$1 = upArray(message).map((msg, i) => i && !/::/.test(msg) ? `grey::${msg}` : msg);
        return this.t(message$1).join(isStep ? `\n${chalk.gray(S_BAR)}  ` : `\n${sign ?? ''}`);
    }
    start(message) {
        const content = this.t(message).map((txt, i) => {
            return chalk[i ? 'grey' : 'cyan'](txt);
        });
        const content$1 = content.join('\n');
        return log.step(content$1);
    }
    step(message) {
        return log.step(this.text(message, false));
    }
    end(message, exit = true) {
        outro(this.text(message, false, Log.Sign));
        return exit && process.exit(0);
    }
    info(message) {
        return log.info(this.text(message, false));
    }
    message(message) {
        return log.message(this.text(message, false));
    }
    success(message) {
        return log.success(this.text(message, false));
    }
    warn(message) {
        return log.warn(this.text(message, false));
    }
    warning(message) {
        return log.warning(this.text(message, false));
    }
    error(message) {
        if (typeof message === 'object' && !Array.isArray(message)) {
            return log.error(message?.toString());
        }
        return log.error(this.text(message, false));
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
