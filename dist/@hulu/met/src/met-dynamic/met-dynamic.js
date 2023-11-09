import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { createElement } from 'react';
import MetGene from '../met-gene/met-gene.js';
import { isReactElement } from '../index.js';
const MetDynamic = (props) => {
    const { component, children, propCover, ...extra } = props;
    const children$ = typeof children === 'function' ? children(props, children) : children;
    let component$;
    if (isReactElement(component)) {
        if (component?.type) {
            component$ = (_jsx(MetGene, { dominant: { ...extra, children: children$ }, propCover: propCover, children: component }));
        }
        else {
            component$ = component?.render({ ...props, children: children$ });
        }
    }
    else {
        // 创建组件
        component$ = createElement(component, { ...props }, children$);
    }
    return _jsx(_Fragment, { children: component$ });
};
export default MetDynamic;
