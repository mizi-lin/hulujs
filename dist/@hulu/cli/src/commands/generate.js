import { select } from '@clack/prompts';
import { Log, Root, Tpl, fuzzypath, globby, someCase } from '@hulu/core';
import path from 'path';
import { getGenerates } from '../handlers/generate/get-tpl-info.js';
/**
 * 根据codemod代码模版生成代码模块
 */
export const command = 'generate';
export const aliases = ['g'];
export const describe = '根据codemod代码模版生成代码模块';
export const builder = (yargs) => {
    return yargs
        .usage(`hulu generate 根据codemod代码模版生成代码模块`)
        .demandCommand(0)
        .example('hulu generate', '代码生成')
        .example('hulu g', '代码生成')
        .showHelpOnFail(true);
};
export const handler = async function (argv) {
    const tpl = new Tpl();
    const root = new Root();
    const log = new Log();
    const buf = Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]);
    const decoder = new TextDecoder();
    const text = decoder.decode(buf, { stream: true });
    console.log(text);
    process.exit();
    log.start(['hulu generate', '代码生成', '别名: hulu g']);
    /**
     * 从 template/generator 提取信息
     */
    const tplGenerator = root.template('generator');
    const paths = await globby(tplGenerator, {
        expandDirectories: {
            files: ['generator'],
            extensions: ['json']
        }
    });
    const generator = await select({
        message: '选择待创建代码模板类型',
        options: getGenerates(paths)
    });
    const { absoulte, address, type, target } = generator;
    log.emptyLine();
    const targetRoot = target === 'repo' ? root.cwd() : root.hulu();
    const answer = await fuzzypath({ rootPath: targetRoot, message: '选择代码文件写入位置', itemType: 'directory' });
    const targetFileName = address.replace(/\.ejs$/, '');
    const targetPath = path.join(targetRoot, answer['path'], targetFileName);
    const name = await text({
        message: '请输入模块名称',
        placeholder: '名称为kebab(中划线)形式，如: tpl-info',
        validate(value) {
            if (value.length === 0)
                return `模块名称不能为空!`;
            if (/[ *_A-Z]/.test(value))
                return `输入格式错误`;
        }
    });
    const params = {
        ...someCase(name)
    };
    let outPath = '';
    if (type === 'single') {
        outPath = await tpl.fileout(absoulte, targetPath, params);
    }
    if (type === 'dir') {
        outPath = await tpl.dirout(absoulte, targetPath, params, { prettier: true });
    }
    log.success(['grey::写入位置:', outPath]);
    log.end(`文件已生成`);
};
