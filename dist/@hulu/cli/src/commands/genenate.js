import { Tpl } from '../../../core/src/tpl.js';
/**
 * 根据codemod代码模版生成代码模块
 */
export const command = 'genenate';
export const aliases = ['g'];
export const describe = '根据codemod代码模版生成代码模块';
export const builder = (yargs) => {
    return yargs
        .usage(`hulu genenate 根据codemod代码模版生成代码模块`)
        .demandCommand(0)
        .example('hulu genenate', '代码生成')
        .example('hulu g', '代码生成')
        .showHelpOnFail(true);
};
export const handler = async function (argv) {
    console.log('hulu genenate');
    const tpl = new Tpl();
};
