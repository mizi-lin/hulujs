/**
 * 模板文件输出配置
 * @source packages/core/src/tpl.ts
 */
export interface TplOutOptions {
    /**
     * 是否美化代码
     * @default true
     */
    prettier?: boolean;
    /**
     * 文件是否覆盖
     * @default: cover
     * cover: 覆盖
     * prompt: 提醒
     * none: 跳过
     */
    cover?: 'cover' | 'prompt' | 'skip';
    /**
     * 文件夹执行多少层级
     * @default: 0 | "0"表示不限层级
     */
    depth?: number;
    /**
     * 是否打印文件输出路径
     * @default false
     */
    print?: boolean;
    /**
     * globby options
     */
    globbyOptions?: Record<string, any>;
}

/**
 * @source packages/core/src/prompts.ts
 */
export interface PromptsConfirmOptions {
    message: string;
    active?: string;
    inactive?: string;
    initialValue?: boolean;
}

export type Primitive = Readonly<string | boolean | number>;
export type PromptsSelectOption<Value> = Value extends Primitive
    ? { value: Value; label?: string; hint?: string }
    : { value: Value; label: string; hint?: string };

export interface PromptsSelectOptions<Options extends PromptsSelectOption<Value>[], Value> {
    message: string;
    options: Options;
    initialValue?: Value;
}

export interface PromptsMultiSelectOptions<Options extends PromptsSelectOption<Value>[], Value> {
    message: string;
    options: Options;
    initialValues?: Value[];
    required?: boolean;
    cursorAt?: Value;
}

export interface PromptsTextOptions {
    message: string;
    placeholder?: string;
    defaultValue?: string;
    initialValue?: string;
    validate?: (value: string) => string | void;
    // 输入框必填，若 validate 不为空，则require失效
    require?: boolean;
}

export interface PromptsCancelOptions {
    message: string;
    exit?: boolean;
}

export type PromptsCancel = boolean | PromptsCancelOptions;
