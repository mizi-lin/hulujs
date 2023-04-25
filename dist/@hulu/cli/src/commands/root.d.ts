/**
 * 获得根目录地址
 * - 根目录地址判断规则为目录下是否拥有 package.json
 */
export declare class Root {
    closest(filePath: string, filename?: string): string;
    /**
     * 命令执行所在项目根目录
     */
    cwd(root?: boolean): string;
    /**
     * hulu runtime root
     */
    dirname(root?: boolean): string;
    /**
     * 执行文件
     */
    filename(): string;
    /**
     * 是否为根目录
     */
    isRoot(filename?: string): any;
}
