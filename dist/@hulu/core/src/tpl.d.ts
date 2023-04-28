import type { Params, TplOutOptions } from '@hulu/types';
/**
 * 文件读取内容和写入
 */
export declare class Tpl {
    static readonly defaultOptions: TplOutOptions;
    /**
     * 读取路径内容
     */
    read(filePath: string): any;
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
    fileout(filePath: string, targetPath: string, params?: Record<string, any>, options?: TplOutOptions): string;
    /**
     * 文件夹下的文件输出到文件输出
     */
    dirout(dirPath: string, targetPath: string, params?: Params, options?: TplOutOptions): Promise<string>;
}
