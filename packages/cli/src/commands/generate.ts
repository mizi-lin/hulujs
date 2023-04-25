import { Arguments } from 'yargs';
import { Tpl } from '@hulu/core';
import { Root } from './root.js';

/**
 * 根据codemod代码模版生成代码模块
 */
export const command = 'generate';
export const aliases = ['g'];
export const describe = '根据codemod代码模版生成代码模块';
export const builder = (yargs: any) => {
    return yargs
        .usage(`hulu generate 根据codemod代码模版生成代码模块`)
        .demandCommand(0)
        .example('hulu generate', '代码生成')
        .example('hulu g', '代码生成')
        .showHelpOnFail(true);
};

export const handler = async function (argv: Arguments<Record<string, any>>) {
    console.log('hulu genenate');
    const tpl = new Tpl();
    const root = new Root();

    console.log('oo-- cwd', root.cwd());
    console.log('oo-- dirname', root.dirname());
    console.log('oo-- filename', root.filename());

    let content = tpl.read('/Users/Mizi/minglamp/repo/fe/v5/dist/@hulu/template/command/{kebab}.ts.ejs');

    content = tpl.render(content, { kebab: 'abcd' });

    console.log('oo-', content);
};
