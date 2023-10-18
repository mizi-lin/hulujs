import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import clx from 'classnames';
import { compact } from '@hulu/mu';
const Met = forwardRef((props, ref) => {
    const { w, h, width = w, height = h, className, cursor, style = {}, tag = 'div', position, top, right, bottom, left, lh, lineHeight = lh, bg, background = bg, overflow, overflowX, overflowY, p, padding = p, pl, pt, pr, pb, paddingLeft = pl, paddingTop = pt, paddingRight = pr, paddingBottom = pb, m, margin = m, ml, mt, mr, mb, marginLeft = ml, marginTop = mt, marginRight = mr, marginBottom = mb, maxHeight, minHeight, maxWidth, minWidth, display, flex, fs, fontSize = fs, ff, fontFamily = ff, fw, fontWeight = fw, gap, children, ta, textAlign = ta, va, verticalAlign = va, ...extraProps } = props;
    const TagName = tag;
    const style$ = compact({
        width,
        height,
        position,
        top,
        right,
        bottom,
        cursor,
        left,
        lineHeight,
        margin,
        marginLeft,
        marginTop,
        marginRight,
        marginBottom,
        maxHeight,
        minHeight,
        maxWidth,
        minWidth,
        overflow,
        overflowX,
        overflowY,
        padding,
        paddingLeft,
        paddingTop,
        paddingRight,
        paddingBottom,
        display,
        background,
        flex,
        fontSize,
        fontFamily,
        fontWeight,
        gap,
        textAlign,
        ...style
    }, 'nil');
    return (_jsx(TagName, { ref: ref, className: clx(className), style: style$, children: children }));
});
export default Met;
