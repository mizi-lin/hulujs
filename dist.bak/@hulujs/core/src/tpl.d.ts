import type { Params, TplOutOptions } from '@hulujs/types';
/**
 * 文件读取内容和写入
 */
export declare class Tpl {
    static readonly defaultOptions: TplOutOptions;
    /**
     * 文档写入基础参数
     */
    baseParams(): {};
    /**
     * 读取路径内容
     */
    read(filePath: string): string | undefined;
    /**
     * 根据模板文本，渲染生成内容
     */
    render(content: string, params?: Record<string, any>, options?: TplOutOptions): any;
    /**
     * 文本输出到文件
     */
    out(content: string, targetPath: string, params?: Record<string, any>, options?: TplOutOptions): string;
    /**
     * 模板文件解析到文件输出
     */
    fileout(srcPath: string, targetPath: string, params?: Record<string, any>, options?: TplOutOptions): string;
    /**
     * 文件夹下的文件夹输出到文件夹输出
     */
    dirout(srcPath: string, targetPath: string, params?: Params, options?: TplOutOptions): Promise<string>;
}
export declare const $tpl: Tpl;
