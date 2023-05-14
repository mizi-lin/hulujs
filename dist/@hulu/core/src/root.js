import path from 'path';
import os from 'os';
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
    cwd() {
        const cwd = process.cwd();
        return this.closest(cwd);
    }
    /**
     * 当前命令所在的项目目录
     */
    pwd() {
        return process.cwd();
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
     * 当前所在文件夹名称
     */
    currentDir() {
        return path.basename(this.pwd());
    }
    /**
     * 系统home(我的文档)的地址
     */
    home() {
        return os.homedir();
    }
    /**
     * hulu 地址
     */
    hulu(packageName) {
        const dirname = this.dirname();
        const huluRoot = this.closest(dirname, 'tsconfig-base.json') ?? this.closest(dirname, '@hulu');
        return packageName ? path.join(huluRoot, 'packages', packageName) : huluRoot;
    }
    /**
     * 是否为根目录
     */
    isRoot(filename = 'package.json') {
        const pwd = this.pwd();
        return fse.pathExistsSync(`${pwd}/${filename}`);
    }
    /**
     * 模版文件所在地址
     */
    template(...filename) {
        const dirname = this.dirname();
        const execute = path.join(...filename);
        if (filename && path.isAbsolute(execute))
            return execute;
        return path.join(dirname, '../template', execute ?? '');
    }
}
const $root = new Root();
export { $root };
