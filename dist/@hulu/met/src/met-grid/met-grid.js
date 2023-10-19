import { jsx as _jsx } from "react/jsx-runtime";
import clx from 'classnames';
const MetGrid = (props) => {
    const { children, style = {}, className = '' } = props;
    return (_jsx("section", { style: style, className: clx('met-grid', className), children: children }));
};
export default MetGrid;
