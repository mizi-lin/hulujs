/**
 * 模板文件输出配置
 * @source packages/core/src/tpl.ts
 */
export interface TplOutOptions {
    /**
     * 是否美化代码
     * @default true
     */
    prettier?: boolean;
    /**
     * 文件是否覆盖
     * @default: cover
     * cover: 覆盖
     * prompt: 提醒
     * none: 跳过
     */
    cover?: 'cover' | 'prompt' | 'skip';
    /**
     * 文件夹执行多少层级
     * @default: 0 | "0"表示不限层级
     */
    depth?: number;
}
