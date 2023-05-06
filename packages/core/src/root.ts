import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import fse from 'fs-extra';

/**
 * 获得根目录地址
 * - 根目录地址判断规则为目录下是否拥有 package.json
 */
export class Root {
    closest(filePath: string, filename: string = 'package.json') {
        const paths = filePath.split(path.sep);

        do {
            const path$1 = paths.join(path.sep);
            const path$2 = path.join(path$1, filename);
            if (fse.pathExistsSync(path$2)) break;
            paths.pop();
        } while (paths.length);

        return paths.join(path.sep);
    }

    /**
     * 命令执行所在项目根目录
     */
    cwd(root: boolean = true) {
        const cwd = process.cwd();
        if (!root) return cwd;
        return this.closest(cwd);
    }

    /**
     * hulu runtime root
     */
    dirname(root: boolean = true) {
        const dirname = path.dirname(this.filename());
        if (!root) return dirname;
        return this.closest(dirname);
    }

    /**
     * 执行文件
     */
    filename() {
        return fileURLToPath(import.meta.url);
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
    hulu(packageName?: string) {
        const dirname = this.dirname();
        const huluRoot = this.closest(dirname, 'tsconfig-base.json') ?? this.closest(dirname, '@hulu');
        return packageName ? path.join(huluRoot, 'packages', packageName) : huluRoot;
    }

    /**
     * 是否为根目录
     */
    isRoot(filename: string = 'package.json') {
        const cwd = this.cwd(false);
        return fse.pathExistsSync(`${cwd}/${filename}`);
    }

    /**
     * 模版文件所在地址
     */
    template(filename?: string) {
        const dirname = this.dirname();
        if (filename && path.isAbsolute(filename)) return filename;
        return path.join(dirname, '../template', filename ?? '');
    }
}

const $root = new Root();
export { $root };
