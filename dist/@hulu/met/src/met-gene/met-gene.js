import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { isNotFalsy } from '@hulu/mu';
import { Children, cloneElement } from 'react';
const MetGene = (props) => {
    const { children, dominant = {}, recessive = {}, propCover = false, ...extra } = props;
    if (typeof children === 'function') {
        return children(dominant, recessive, extra) ?? _jsx(_Fragment, {});
    }
    if (!Children.count(children)) {
        return _jsx(_Fragment, {});
    }
    return Children.map(children, (col) => {
        // 空节点
        if (!col)
            return null;
        // 文本或空行等
        if (!['function', 'object'].includes(typeof col.type))
            return col;
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
        return cloneElement(col, props);
    });
};
export default MetGene;
