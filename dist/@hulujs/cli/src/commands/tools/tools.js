import { $log, $prompts } from '@hulujs/core';
import { isFalsy } from '@hulujs/mu';
import { removeCurrentAll, removeCurrentDir, removeCurrentFiles } from './rm.js';
/**
 * Git的某些操作结合的快捷命令
 */
export const command = 'tools';
export const aliases = ['t'];
export const describe = '一些shell小命令或扩展的工具集合';
export const builder = (yargs) => {
    return yargs
        .usage(`hulu tools, 一些shell小命令或扩展的工具集合`)
        .option('depth', { type: 'number', default: 1, description: '层级' })
        .option('dot', { type: 'boolean', default: false, description: '是否要删除dot文件(.)' })
        .demandCommand(0)
        .example('hulu tools', '一些shell小命一些shell小命令或扩展的工具集合令集合')
        .showHelpOnFail(true);
};
export const handler = async function (argv) {
    $log.start([`hulu tools`, `一些shell小命令或扩展的工具集合`]);
    const [cmd, ...params] = argv._;
    let command = params.join(':');
    if (isFalsy(params)) {
        command = (await $prompts.select({
            message: '请选择要执行的命令',
            options: [
                {
                    label: 'rm: 删除当前目录下所有的文件',
                    value: 'rm:all',
                    hint: 'hulu tools rm all'
                },
                {
                    label: 'rm: 仅删除当前目录下的文件',
                    value: 'rm:file',
                    hint: 'hulu tools rm file --depth 1 --dot false|true'
                },
                {
                    label: 'rm: 仅删除当前目录下的文件夹',
                    value: 'rm:dir',
                    hint: 'hulu tools rm dir --depth 1 --dot false|true'
                }
            ]
        }));
    }
    const tools = {
        'rm:dir': removeCurrentDir,
        'rm:file': removeCurrentFiles,
        'rm:all': removeCurrentAll
    };
    await tools[command]?.(argv);
};
