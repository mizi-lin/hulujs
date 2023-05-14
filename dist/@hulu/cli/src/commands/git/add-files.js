import { $git, $prompts } from '@hulu/core';
/**
 * 选择文件提交的暂存区
 */
export async function selectNotAddedFiles() {
    const status = await $git.status();
    return (await $prompts.multiselect({
        message: '选择待提交的文件',
        options: status.not_added.map((file) => {
            return { label: file, value: file };
        })
    }));
}
