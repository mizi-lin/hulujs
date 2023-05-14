import { upArray } from '@hulu/mu';
import {
    PromptsCancel,
    PromptsCancelOptions,
    PromptsConfirmOptions,
    PromptsMultiSelectOptions,
    PromptsSelectOption,
    PromptsSelectOptions,
    PromptsTextOptions
} from '@hulu/types';
import { $log, Log } from './log.js';
import { prompts } from './msc.js';

export class Prompts {
    isCancelPrompt(prompt, options: PromptsCancelOptions) {
        const { message = [], exit = true } = options ?? {};
        if (prompts.isCancel(prompt)) {
            $log.end($log.text([exit && 'cyan::命令结束', ...upArray(message)].filter(Boolean), false, Log.Sign));
            exit && process.exit(1);
        }
    }

    async confirm(options: PromptsConfirmOptions, cancel: PromptsCancel = true): Promise<boolean | symbol> {
        const confirm = await prompts.confirm(options);
        cancel && this.isCancelPrompt(confirm, cancel as PromptsCancelOptions);
        return confirm;
    }

    async select<T extends PromptsSelectOption<U>[], U>(
        options: PromptsSelectOptions<T, U>,
        cancel: PromptsCancel = true
    ) {
        const select = await prompts.select(options);
        cancel && this.isCancelPrompt(select, cancel as PromptsCancelOptions);
        return select;
    }

    async multiselect<T extends PromptsSelectOption<U>[], U>(
        options: PromptsMultiSelectOptions<T, U>,
        cancel: PromptsCancel = true
    ) {
        const select = await prompts.multiselect(options);
        cancel && this.isCancelPrompt(select, cancel as PromptsCancelOptions);
        return select;
    }

    async text<T>(options: PromptsTextOptions, cancel: PromptsCancel = true): Promise<T> {
        const { require, ...extra } = options;
        const { validate } = options;
        const requireFunc = (value) => {
            if (!value.length) return `Value is required!`;
        };
        extra.validate = validate ? (require ? requireFunc : validate) : validate;
        const text = await prompts.text(options);
        cancel && this.isCancelPrompt(text, cancel as PromptsCancelOptions);
        return text as T;
    }
}

export const $prompts = new Prompts();
export default Prompts;
