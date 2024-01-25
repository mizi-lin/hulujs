import { isFalsy, isNotFalsy, upArray } from '@hulujs/mu';
import { mapKeys } from 'lodash-es';
import { FC, CSSProperties, Children, cloneElement, ReactNode, PropsWithChildren, createContext } from 'react';

/**
 * 基因透传组件
 * - 组件的属性像基因片段一样可以遗传给子元素
 * - 通常用于组件开发
 */
export interface MetGeneProps extends PropsWithChildren {
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
    /**
     * 桥接属性
     */
    bridge?: boolean;
}

export const MetGeneContext = createContext({});

const MetGene: FC<MetGeneProps> = (props) => {
    const { children, dominant = {}, recessive = {}, propCover = false, bridge = false, ...extra } = props;

    if (typeof children === 'function') {
        // @ts-ignore
        return children(dominant, recessive, extra) ?? <></>;
    }

    if (!Children.count(children)) {
        return <></>;
    }

    const children$ = Children.map(children, (col) => {
        // 空节点
        if (!col) return null;

        if (['string', 'number', 'boolean'].includes(typeof col)) return col;

        // 文本或空行等
        // @ts-ignore
        if (!['function', 'object'].includes(typeof col.type)) return col;

        // @ts-ignore
        const colProps = col?.props ?? {};
        const geneProps = dominant ?? extra ?? {};

        if (colProps.nogene) return col;

        // 当不声明显示基因的时候，其它属性就当做显示基因向下透传
        // 透传原则, 离目标越近，权限越大
        // propCover = true, 属性值覆盖
        const props = {
            ...(propCover ? {} : geneProps),
            ...colProps,
            ...(propCover ? geneProps : {}),
            ...(isNotFalsy(recessive) ? { __metgene$recessive: JSON.stringify(recessive) } : {})
        };

        // @ts-ignore
        if (!col?.type?.name) {
            const props$ = mapKeys(props, (value, key) => {
                return /^on[A-Z]/.test(key) ? key : key.toLowerCase();
            });
            // @ts-ignore
            return cloneElement(col as any, props$);
        }

        // @ts-ignore
        return cloneElement(col, props);
    });

    return bridge ? <MetGeneContext.Provider value={dominant}>{children$}</MetGeneContext.Provider> : <>{children$}</>;
};

export default MetGene;
