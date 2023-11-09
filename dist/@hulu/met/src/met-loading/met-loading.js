import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MetCenter, MetDynamic } from '../index.js';
import { Spin } from 'antd';
/**
 * @todo 父元素过高的时候，显示区域设置
 * @todo 父元素无高度的时，高度配置
 */
const MetLoading = (props) => {
    const { component = _jsx(Spin, {}), ...extra } = props;
    return (_jsxs(MetCenter, { h: '100%', w: '100%', ...extra, children: [_jsx(MetDynamic, { component: component }), props?.children] }));
};
export default MetLoading;
