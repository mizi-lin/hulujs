import { jsx as _jsx } from "react/jsx-runtime";
import { MetCenter } from '../index.js';
const MetError = (props) => {
    const { error, resetErrorBoundary } = props;
    const handleError = () => {
        console.log(error);
    };
    return (_jsx(MetCenter, { minHeight: 100, maxHeight: 300, className: 'met-error' }));
};
export default MetError;
