/**
 * 文件读取内容和写入
 */
export declare class Tpl {
    /**
     * 读取路径内容
     * @param filePath
     * @param loggerType
     */
    read(filePath: string): any;
    /**
     * 根据模板文本，渲染生成内容
     * @param content
     * @param params
     * @returns
     */
    render(content: string, params?: Record<string, any>, target?: string): any;
    out(srcPath: string, params: Record<string, any> | undefined, targetPath: string): void;
}
