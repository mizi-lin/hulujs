import { jsx as _jsx } from "react/jsx-runtime";
import { MetCenter, MetNodata } from '../index.js';
import { FrownOutlined } from '@ant-design/icons';
import './met-error.less';
import { isDev } from '../env.js';
const MetError = (props) => {
    const { error, resetErrorBoundary } = props;
    const handleError = () => {
        console.log(error);
    };
    return (_jsx(MetCenter, { minHeight: 100, maxHeight: 300, className: 'met-error', children: isDev ? _jsx(FrownOutlined, { onClick: handleError }) : _jsx(MetNodata, {}) }));
};
export default MetError;
