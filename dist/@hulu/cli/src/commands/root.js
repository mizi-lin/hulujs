import path from 'path';
import { fileURLToPath } from 'url';
import fse from 'fs-extra';
/**
 * 获得根目录地址
 * - 根目录地址判断规则为目录下是否拥有 package.json
 */
export class Root {
    closest(filePath, filename = 'package.json') {
        const paths = filePath.split(path.sep);
        do {
            const path$1 = paths.join(path.sep);
            const path$2 = path.join(path$1, filename);
            if (fse.pathExistsSync(path$2))
                break;
            paths.pop();
        } while (paths.length);
        return paths.join(path.sep);
    }
    /**
     * 命令执行所在项目根目录
     */
    cwd(root = true) {
        const cwd = process.cwd();
        if (!root)
            return cwd;
        return this.closest(cwd);
    }
    /**
     * hulu runtime root
     */
    dirname(root = true) {
        const dirname = path.dirname(this.filename());
        if (!root)
            return dirname;
        return this.closest(dirname);
    }
    /**
     * 执行文件
     */
    filename() {
        return fileURLToPath(import.meta.url);
    }
    /**
     * 是否为根目录
     */
    isRoot(filename = 'package.json') {
        const cwd = this.cwd(false);
        return fse.pathExistsSync(`${cwd}/${filename}`);
    }
}
