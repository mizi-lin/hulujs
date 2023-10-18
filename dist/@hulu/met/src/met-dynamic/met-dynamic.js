import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { createElement } from 'react';
import MetGene from '../met-gene/met-gene.js';
const MetDynamic = (props) => {
    const { component, children, style = {}, className = '', propCover, ...extra } = props;
    const children$ = typeof children === 'function' ? children(props, children) : children;
    let component$;
    if (typeof component === 'object' && !component?.type) {
        // 自定义组件
        props.children = children$;
        component$ = component?.render(props);
    }
    else if (typeof component === 'object') {
        // 通过基因组件透传props
        component$ = (_jsx(MetGene, { dominant: { ...props, children: children$ }, propCover: propCover, children: component }));
    }
    else {
        // 创建组件
        component$ = createElement(component, { ...props }, children$);
    }
    return _jsx(_Fragment, { children: component$ });
};
export default MetDynamic;
