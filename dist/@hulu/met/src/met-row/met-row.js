import { jsx as _jsx } from "react/jsx-runtime";
import MetFlex from '../met-flex/index.js';
const MetRow = (props) => {
    const { className, ...extra } = props;
    return (_jsx(MetFlex, { alignItems: 'stretch', placement: 'left', vertical: false, className: [className, 'met-row'], ...props }));
};
export default MetRow;
