import fse from 'fs-extra';
import ejs from 'ejs';
/**
 * 文件读取内容和写入
 */
export class Tpl {
    /**
     * 读取路径内容
     * @param filePath
     * @param loggerType
     */
    read(filePath) {
        try {
            return fse.readFileSync(filePath, 'utf-8');
        }
        catch (e) {
            return void 0;
        }
    }
    /**
     * 根据模板文本，渲染生成内容
     * @param content
     * @param params
     * @returns
     */
    render(content, params = {}, target) {
        if (target) {
        }
        return ejs.render(content, params, { debug: !!process.env?.EJS_DEBUG });
    }
    out(srcPath, params = {}, targetPath) { }
}
