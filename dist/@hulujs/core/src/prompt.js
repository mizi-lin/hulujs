import { upArray } from '@hulujs/mu';
import { $log, Log } from './log.js';
import { prompts } from './msc.js';
export class Prompts {
    isCancelPrompt(prompt, options) {
        const { message = [], exit = true } = options ?? {};
        if (prompts.isCancel(prompt)) {
            $log.end($log.text([exit && 'cyan::命令结束', ...upArray(message)].filter(Boolean), false, Log.Sign));
            exit && process.exit(1);
        }
    }
    async confirm(options, cancel = true) {
        const confirm = await prompts.confirm(options);
        cancel && this.isCancelPrompt(confirm, cancel);
        return confirm;
    }
    async select(options, cancel = true) {
        const select = await prompts.select(options);
        cancel && this.isCancelPrompt(select, cancel);
        return select;
    }
    async multiselect(options, cancel = true) {
        const select = await prompts.multiselect(options);
        cancel && this.isCancelPrompt(select, cancel);
        return select;
    }
    async text(options, cancel = true) {
        const { require, ...extra } = options;
        const { validate } = options;
        const requireFunc = (value) => {
            if (!value.length)
                return `Value is required!`;
        };
        extra.validate = validate ? (require ? requireFunc : validate) : validate;
        const text = await prompts.text(options);
        cancel && this.isCancelPrompt(text, cancel);
        return text;
    }
}
export const $prompts = new Prompts();
export default Prompts;
