/**
 * 获得根目录地址
 * - 根目录地址判断规则为目录下是否拥有 package.json
 */
export declare class Repo {
    /**
     * 获得最接近文件的路径
     */
    closest(filePath: string, filename?: string): string;
    /**
     * 命令执行所在项目根目录
     */
    cwd(...paths: string[]): any;
    /**
     * 当前命令所在的项目目录
     */
    pwd(): string;
    /**
     * hulu runtime root
     */
    dirname(root?: boolean): string;
    /**
     * 执行文件
     */
    filename(): string;
    /**
     * 当前所在文件夹名称
     */
    currentDir(): string;
    /**
     * 系统home(我的文档)的地址
     */
    home(): string;
    /**
     * hulu文件夹
     */
    hulu(...paths: string[]): any;
    /**
     * hulu文件夹
     */
    src(...paths: string[]): any;
    /**
     * hulu 地址
     */
    cli(packageName?: string): string;
    /**
     * 是否为根目录
     */
    isRoot(filename?: string): any;
    /**
     * 模版文件所在地址
     */
    template(...filename: string[]): string;
    /**
     * repo 配置
     */
    config(): any;
}
declare const $repo: Repo;
export { $repo };
