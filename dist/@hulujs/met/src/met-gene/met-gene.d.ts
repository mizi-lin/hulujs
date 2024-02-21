import { FC, CSSProperties, ReactNode } from 'react';
/**
 * 基因透传组件
 * - 组件的属性像基因片段一样可以遗传给子元素
 * - 通常用于组件开发
 */
export interface MetGeneProps {
    dominant?: Record<string, any>;
    recessive?: Record<string, any>;
    style?: CSSProperties;
    className?: string;
    /**
     * 属性覆盖
     * - 正常情况下，属性覆盖原则采取就近原则，离目标越近权重越大
     * - 手动配置propCover = true, 则 gene 覆盖 子元素 prop; 否则子元素拥有该属性，子元素显性呈现
     * @default false
     */
    propCover?: boolean;
    /**
     * 桥接属性
     */
    bridge?: boolean;
    children?: ReactNode | ((...args: any[]) => ReactNode);
}
export declare const MetGeneContext: import("react").Context<{}>;
declare const MetGene: FC<MetGeneProps>;
export default MetGene;
