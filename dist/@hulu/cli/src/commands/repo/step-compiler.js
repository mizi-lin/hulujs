import { $prompts } from '@hulu/core';
/**
 * 选择编译器 compiler
 */
const stepCompiler = async () => {
    const compiler = await $prompts.select({
        message: `请选择编译器`,
        options: [
            { label: 'Vite v5', value: 'vite', hint: '推荐，默认' },
            { label: 'Umi v4', value: 'umi' },
            { label: 'CRA - React create app', value: 'cra' },
            { label: 'Next', value: 'next' }
        ]
    });
    return compiler;
};
export default stepCompiler;
