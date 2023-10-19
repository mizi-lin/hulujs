import { jsx as _jsx } from "react/jsx-runtime";
import clx from 'classnames';
import Met from '../met/met.js';
import { compact } from '@hulu/mu';
const placementStyleMap = {
    row: {
        top: { justifyContent: 'center', alignItems: 'flex-start' },
        topLeft: { justifyContent: 'flex-start', alignItems: 'flex-start' },
        topRight: { justifyContent: 'flex-end', alignItems: 'flex-start' },
        left: { justifyContent: 'flex-start', alignItems: 'center' },
        leftTop: { justifyContent: 'flex-start', alignItems: 'flex-start' },
        leftBottom: { justifyContent: 'flex-start', alignItems: 'flex-end' },
        right: { justifyContent: 'flex-end', alignItems: 'center' },
        rightTop: { justifyContent: 'flex-end', alignItems: 'flex-start' },
        rightBottom: { justifyContent: 'flex-end', alignItems: 'flex-end' },
        bottom: { justifyContent: 'center', alignItems: 'flex-end' },
        bottomLeft: { justifyContent: 'flex-start', alignItems: 'flex-end' },
        bottomRight: { justifyContent: 'flex-end', alignItems: 'flex-end' },
        center: { justifyContent: 'center', alignItems: 'center' },
        betweenTop: { justifyContent: 'space-between', alignItems: 'flex-start' },
        betweenMiddle: { justifyContent: 'space-between', alignItems: 'center' },
        betweenBottom: { justifyContent: 'space-between', alignItems: 'flex-end' }
    },
    column: {
        top: { alignItems: 'center', justifyContent: 'flex-start' },
        topLeft: { alignItems: 'flex-start', justifyContent: 'flex-start' },
        topRight: { alignItems: 'flex-end', justifyContent: 'flex-start' },
        left: { alignItems: 'flex-start', justifyContent: 'center' },
        leftTop: { alignItems: 'flex-start', justifyContent: 'flex-start' },
        leftBottom: { alignItems: 'flex-start', justifyContent: 'flex-end' },
        right: { alignItems: 'flex-end', justifyContent: 'center' },
        rightTop: { alignItems: 'flex-end', justifyContent: 'flex-start' },
        rightBottom: { alignItems: 'flex-end', justifyContent: 'flex-end' },
        bottom: { alignItems: 'center', justifyContent: 'flex-end' },
        bottomLeft: { alignItems: 'flex-start', justifyContent: 'flex-end' },
        bottomRight: { alignItems: 'flex-end', justifyContent: 'flex-end' },
        center: { alignItems: 'center', justifyContent: 'center' },
        betweenTop: { alignItems: 'flex-start', justifyContent: 'space-between' },
        betweenMiddle: { alignItems: 'center', justifyContent: 'space-between' },
        betweenBottom: { alignItems: 'flex-end', justifyContent: 'space-between' }
    }
};
const MetFlex = (props) => {
    const { children, style = {}, className = '', placement = 'left', vertical, inline, wrap = 'nowrap', justify, align, flexWrap = wrap, flexDirection = vertical ? 'column' : 'row', justifyContent = justify, alignItems = align, ...extra } = props;
    const extra$ = {
        display: inline ? 'inline-flex' : 'flex',
        ...(placementStyleMap[flexDirection]?.[placement] ?? {}),
        ...compact({ flexDirection, flexWrap, justifyContent, alignItems }),
        ...extra
    };
    return (_jsx(Met, { className: clx('met-flex', className), ...extra$, children: children }));
};
export default MetFlex;
