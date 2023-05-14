import { PromptsCancel, PromptsCancelOptions, PromptsConfirmOptions, PromptsMultiSelectOptions, PromptsSelectOption, PromptsSelectOptions, PromptsTextOptions } from '@hulu/types';
export declare class Prompts {
    isCancelPrompt(prompt: any, options: PromptsCancelOptions): void;
    confirm(options: PromptsConfirmOptions, cancel?: PromptsCancel): Promise<boolean | symbol>;
    select<T extends PromptsSelectOption<U>[], U>(options: PromptsSelectOptions<T, U>, cancel?: PromptsCancel): Promise<symbol | U>;
    multiselect<T extends PromptsSelectOption<U>[], U>(options: PromptsMultiSelectOptions<T, U>, cancel?: PromptsCancel): Promise<symbol | U[]>;
    text<T>(options: PromptsTextOptions, cancel?: PromptsCancel): Promise<T>;
}
export declare const $prompts: Prompts;
export default Prompts;
