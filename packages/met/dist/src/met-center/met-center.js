import { jsx as _jsx } from "react/jsx-runtime";
import MetFlex from '../met-flex/index.js';
const MetCenter = (props) => {
    return _jsx(MetFlex, { placement: 'center', gap: 8, w: '100%', ...props });
};
export default MetCenter;
