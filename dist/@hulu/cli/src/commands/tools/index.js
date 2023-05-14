import { $log, $prompts } from '@hulu/core';
import { removeCurrentDir } from './rm.js';
/**
 * Git的某些操作结合的快捷命令
 */
export const command = 'tools';
export const aliases = ['t'];
export const describe = '一些shell小命令或扩展的工具集合';
export const builder = (yargs) => {
    return yargs
        .usage(`hulu tools, 一些shell小命令或扩展的工具集合`)
        .demandCommand(0)
        .example('hulu tools', '一些shell小命一些shell小命令或扩展的工具集合令集合')
        .showHelpOnFail(true);
};
export const handler = async function (argv) {
    $log.start(`hulu tools`);
    const [cmd, ...params] = argv._;
    let command = params.join(':');
    if (!cmd) {
        command = (await $prompts.select({
            message: '请选择要执行的命令',
            options: [{ label: 'rm: 删除当前目录下所有的文件', value: 'rm:all', hint: 'hulu tools rm all' }]
        }));
    }
    const tools = {
        'rm:all': removeCurrentDir
    };
    await tools[command]?.();
};
