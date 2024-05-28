/**
 * 对 path 路径的补强
 */
declare class PathExtra {
    /**
     * 获得路径中的文件全名(包括后缀名)
     */
    filename(address: string): string;
    /**
     * 获得路径中文件名(文件名部分)
     * @param cursor 游标调控
     */
    pre(address: string, cursor?: number): string;
    ext(address: string): string;
}
export declare const $pe: PathExtra;
export {};
