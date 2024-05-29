import { $prompts } from '@hulujs/core';
import { compilerOptions } from '../../compiler-options.js';
/**
 * 选择编译器 compiler
 */
const stepCompiler = async () => {
    const compiler = await $prompts.select({
        message: `请选择编译器`,
        options: compilerOptions
    });
    return compiler;
};
export default stepCompiler;
