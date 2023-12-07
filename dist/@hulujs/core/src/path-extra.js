import path from 'path';
/**
 * 对 path 路径的补强
 */
class PathExtra {
    /**
     * 获得路径中的文件全名(包括后缀名)
     */
    filename(address) {
        return address.split(path.sep).at(-1);
    }
    /**
     * 获得路径中文件名(文件名部分)
     * @param cursor 游标调控
     */
    pre(address, cursor = -1) {
        const sep = '.';
        const filename = this.filename(address);
        const data = filename.split(sep);
        return data.slice(0, cursor).join(sep);
    }
    ext(address) {
        const ext = path.extname(address);
        return ext;
    }
}
export const $pe = new PathExtra();
