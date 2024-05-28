import { jsx as _jsx } from "react/jsx-runtime";
import MetFlex from '../met-flex/index.js';
const MetLeft = (props) => {
    return _jsx(MetFlex, { placement: 'left', gap: 8, ...props });
};
export default MetLeft;
