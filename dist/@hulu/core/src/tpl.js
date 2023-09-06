import { globby } from 'globby';
import { format } from '@hulu/mu';
import ejs from 'ejs';
import fse from 'fs-extra';
import path from 'path';
import { $log } from './log.js';
/**
 * 文件读取内容和写入
 */
class Tpl {
    static defaultOptions = {
        cover: 'cover',
        depth: Infinity,
        print: false
    };
    /**
     * 文档写入基础参数
     */
    baseParams() {
        return {};
    }
    /**
     * 读取路径内容
     */
    read(filePath) {
        try {
            return fse.readFileSync(filePath, 'utf-8');
        }
        catch (e) {
            console.error('tpl.read', e);
            return void 0;
        }
    }
    /**
     * 根据模板文本，渲染生成内容
     */
    render(content, params = {}, options = {}) {
        try {
            return ejs.render(content, params, { debug: !!process.env?.EJS_DEBUG });
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
    /**
     * 文本输出到文件
     */
    out(content, targetPath, params = {}, options = {}) {
        const config = { ...Tpl.defaultOptions, ...options };
        // @todo cover
        const outPath = format(targetPath, params);
        fse.outputFileSync(outPath, content);
        config.print && $log.info(['正在写入', outPath]);
        return outPath;
    }
    /**
     * 模板文件解析到文件输出
     */
    fileout(srcPath, targetPath, params = {}, options = {}) {
        const config = { ...Tpl.defaultOptions, ...options };
        // @todo cover
        const content = this.read(srcPath);
        const content$render = this.render(content, params, config);
        return this.out(content$render, targetPath, params, config);
    }
    /**
     * 文件夹下的文件输出到文件输出
     */
    async dirout(srcPath, targetPath, params = {}, options = {}) {
        const config = { ...Tpl.defaultOptions, ...options };
        const files = await globby(srcPath, {
            deep: config.depth,
            onlyFiles: true,
            ignore: ['**/generator.json'],
            ...config?.globbyOptions
        });
        for await (const file of files) {
            const srcPath$1 = file;
            const reletive = path.relative(srcPath, file);
            const targetPath$1 = format(path.join(targetPath, reletive), params);
            // 只处理后缀名为ejs的文件，其他文件拷贝
            if (!/\.ejs$/.test(file)) {
                fse.copySync(srcPath$1, targetPath$1, {
                    overwrite: config.cover === 'cover'
                });
                continue;
            }
            const targetPath$2 = targetPath$1.replace(/\.ejs$/, '');
            this.fileout(srcPath$1, targetPath$2, params, config);
        }
        return format(targetPath, params);
    }
}
export { Tpl };
export const $tpl = new Tpl();
