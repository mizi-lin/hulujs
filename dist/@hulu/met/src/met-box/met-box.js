import { jsx as _jsx } from "react/jsx-runtime";
import MetFlex from '../met-flex/index.js';
const MetBox = (props) => {
    const { className, ...extra } = props;
    return (_jsx(MetFlex, { alignItems: 'stretch', placement: 'top', overflowY: 'auto', className: ['met-box', className], vertical: true, ...extra }));
};
export default MetBox;
