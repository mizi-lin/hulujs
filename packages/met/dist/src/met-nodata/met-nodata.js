import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MetCenter, MetDynamic } from '../index.js';
/**
 * @todo 父元素过高的时候，显示区域设置
 * @todo 父元素无高度的时，高度配置
 * @todo nodata, loading component 可以全局配置
 */
const MetNodata = (props) => {
    // @todo Empty
    const { description = _jsx(_Fragment, {}), 
    // image = Empty.PRESENTED_IMAGE_SIMPLE,
    // component = <Empty image={image} description={description} />,
    image = _jsx(_Fragment, {}), component = _jsx(_Fragment, {}), ...extra } = props;
    return (_jsxs(MetCenter, { h: '100%', w: '100%', ...extra, children: [_jsx(MetDynamic, { component: component }), props?.children] }));
};
export default MetNodata;