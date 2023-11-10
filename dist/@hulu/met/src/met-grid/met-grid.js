import { jsx as _jsx } from "react/jsx-runtime";
import clx from 'classnames';
import { Met } from '../index.js';
import { isFalsy } from '@hulu/mu';
const adjustStyle = (value, type) => {
    if (isFalsy(value))
        return void 0;
    if (typeof value === 'number') {
        return {
            [`gridTemplate${type}`]: `repeat(${value}, 1fr)`
        };
    }
    if (Array.isArray(value) && typeof value[0] === 'number') {
        const [count, length] = value;
        const length$ = typeof length === 'number' ? `${length}px` : length;
        return {
            [`gridTemplate${type}`]: `repeat(${count}, ${length$})`
        };
    }
    const values = typeof value === 'string' ? value.trim().split(/\s+/g) : value;
    if (values.length === 1) {
        return {
            [`gridAuto${type}`]: values[0]
        };
    }
    return {
        [`gridTemplate${type}`]: values.join(' ')
    };
};
const MetGrid = (props) => {
    const { children, inline, cols, rows, className = '', ...extra } = props;
    const attr = { ...adjustStyle(cols, 'Columns'), ...adjustStyle(rows, 'Rows') };
    return (_jsx(Met, { display: "grid", className: clx('met-grid', className), inline: inline, ...attr, ...extra, children: children }));
};
export default MetGrid;
