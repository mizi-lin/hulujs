import { $_git, $git, $log, $prompts } from '@hulu/core';
import { commitMsg } from './commit-msg.js';
import { selectNotAddedFiles } from './add-files.js';
/**
 * Git的某些操作结合的快捷命令
 */
export const command = 'git';
export const aliases = [];
export const describe = 'Git的某些操作结合的快捷命令';
export const builder = (yargs) => {
    return yargs
        .usage(`hulu git, Git的某些操作结合的快捷命令`)
        .demandCommand(0)
        .example('hulu git', 'Git的某些操作结合的快捷命令')
        .showHelpOnFail(true);
};
export const handler = async function (argv) {
    $log.start(`hulu git`);
    const [cmd, ...params] = argv._;
    let command = params.join(':');
    if (!cmd) {
        command = (await $prompts.select({
            message: '请选择要执行的命令',
            options: [
                { label: '提交文件，并推送', value: 'acp', hint: 'hulu git acp' },
                { label: '添加commit message', value: 'commit', hint: 'hulu git commit' },
                { label: '添加commit message, 并推送远程', value: 'cp', hint: 'hulu git cp' },
                { label: '选择文件提交暂存区', value: 'add:select', hint: 'hulu git add --select' },
                { label: '选择文件提交, 并推送', value: 'acp:select', hint: 'hulu git acp --select' }
            ]
        }));
    }
    const remote = await $git.getRemote();
    try {
        if (command === 'acp') {
            const msg = await commitMsg();
            return $git.acp(msg);
        }
        if (command === 'acp:select') {
            const msg = await commitMsg();
            const files = await selectNotAddedFiles();
            return $git.acp(msg, files);
        }
        if (command === 'add:select') {
            const files = await selectNotAddedFiles();
            return $git.add(files);
        }
        if (command === 'commit') {
            const msg = await commitMsg();
            await $_git.commit(msg);
        }
        if (command === 'cp') {
            const msg = await commitMsg();
            await $_git.commit(msg);
            await $_git.push(['-u', remote, 'HEAD']);
        }
        $log.success('执行成功');
        $log.end(`命令退出`);
    }
    catch (e) {
        console.error(e);
    }
};
