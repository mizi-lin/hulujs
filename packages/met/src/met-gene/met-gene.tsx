import { isNotFalsy } from '@hulu/mu';
import { FC, CSSProperties, Children, cloneElement, ReactNode } from 'react';

/**
 * 基因透传组件
 * - 组件的属性像基因片段一样可以遗传给子元素
 * - 通常用于组件开发
 */
export interface MetGeneProps {
    // 需要向下透传的显性基因片段
    dominant?: Record<string, any>;
    // 需要向下透传的隐性基因片段
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
    children?:
        | ReactNode
        | ((
              dominant?: Record<string, any>,
              recessive?: Record<string, any>,
              extra?: Record<string, any>
          ) => ReactNode);
}

const MetGene: FC<MetGeneProps> = (props) => {
    const { children, dominant = {}, recessive = {}, propCover = false, ...extra } = props;

    if (typeof children === 'function') {
        // @ts-ignore
        return children(dominant, recessive, extra) ?? <></>;
    }

    if (!Children.count(children)) {
        return <></>;
    }

    return Children.map(children, (col) => {
        // 空节点
        if (!col) return null;
        // 文本或空行等
        // @ts-ignore
        if (!['function', 'object'].includes(typeof col.type)) return col;

        // @ts-ignore
        const colProps = col?.props ?? {};
        const geneProps = dominant ?? extra ?? {};

        // 当不声明显示基因的时候，其它属性就当做显示基因向下透传
        // 透传原则, 离目标越近，权限越大
        // propCover = true, 属性值覆盖
        const props = {
            ...(propCover ? {} : geneProps),
            ...colProps,
            ...(propCover ? geneProps : {}),
            ...(isNotFalsy(recessive) ? { __metgenerecessive: JSON.stringify(recessive) } : {})
        };

        // @ts-ignore
        return cloneElement(col, props);
    });
};

export default MetGene;
