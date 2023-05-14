import { $prompts } from '@hulu/core';
export const commitMsg = async () => {
    const prefix = await $prompts.select({
        message: `? 请选择 Convertional Commit 类型`,
        options: [
            { value: 'feat', label: '新功能、新特性' },
            { value: 'fix', label: '修改 bug' },
            { value: 'chore', label: '其他修改（不在上述类型中的修改）' },
            { value: 'build', label: '影响项目构建或依赖项修改' },
            { value: 'ci', label: '持续集成相关文件修改' },
            { value: 'docs', label: '文档修改' },
            { value: 'perf', label: '更改代码，以提高性能' },
            { value: 'refactor', label: '代码重构（重构，在不影响代码内部行为、功能下的代码修改）' },
            { value: 'revert', label: '恢复上一次提交' },
            { value: 'style', label: '代码格式修改, 注意不是 css 修改（例如分号修改）' },
            { value: 'test', label: '测试用例新增、修改' }
        ].map(({ value, label }) => {
            return { value, label: `${value}: ${label}` };
        })
    });
    const msg = await $prompts.text({
        message: `? 请输入 Commit Message`
    });
    return `${prefix}: ${msg}`;
};
