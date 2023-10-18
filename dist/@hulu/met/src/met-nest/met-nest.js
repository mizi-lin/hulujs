import { jsx as _jsx } from "react/jsx-runtime";
import { upArray } from '@hulu/mu';
import MetDynamic from '../met-dynamic/index.js';
import MetGene from '../met-gene/met-gene.js';
/**
 * 嵌套组件
 * - 通常用于组件开发
 * @param props
 * @returns
 */
const MetNest = (props) => {
    const { children, style = {}, className = '', components: comp, propCover, ...extra } = props;
    const components = upArray(comp);
    const nest = (components) => {
        if (!components?.length)
            return (_jsx(MetGene, { dominant: extra, propCover: propCover, children: children }));
        const [first, ...others] = components;
        const [component, props] = upArray(first);
        return (_jsx(MetGene, { dominant: extra, propCover: propCover, children: _jsx(MetDynamic, { component: component, ...props, propCover: propCover, children: nest(others) }) }));
    };
    return nest(components);
};
export default MetNest;
