import path from 'path';

/**
 * 对 path 路径的补强
 */
class PathExtra {
    /**
     * 获得路径中的文件全名(包括后缀名)
     */
    filename(address: string) {
        return address.split(path.sep).at(-1) as string;
    }

    /**
     * 获得路径中文件名(文件名部分)
     * @param cursor 游标调控
     */
    pre(address: string, cursor: number = -1) {
        const sep = '.';
        const filename = this.filename(address);
        const data = filename.split(sep);
        return data.slice(0, cursor).join(sep);
    }

    ext(address: string) {
        const ext = path.extname(address);
        return ext;
    }
}

export const $pe = new PathExtra();
