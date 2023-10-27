import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import clx from 'classnames';
import { groupBy } from 'lodash-es';
import { compact, map } from '@hulu/mu';
const Met = forwardRef((props, ref) => {
    const { tag = 'div', children, style = {}, className = '', ...extra } = props;
    const TagName = tag;
    const { w, width = w, h, height = h, lh, lineHeight = lh, br, borderRadius = br, bg, background = bg, o, overflow, ox, overflowX, oy, overflowY, p, padding = p, pl, paddingLeft = pl, pt, paddingTop = pt, pr, paddingRight = pr, pb, paddingBottom = pb, m, margin = m, ml, marginLeft = ml, mt, marginTop = mt, mr, marginRight = mr, mb, marginBottom = mb, fs, fontSize = fs, ff, fontFamily = ff, color, fw, fontWeight = fw, ta, textAlign = ta, va, verticalAlign = va, ...more } = extra;
    // 获取  dataset 属性值
    const { properties = [], dataset = [] } = groupBy(Object.entries(more), ([key]) => {
        return /^data-/gi.test(key) ? 'dataset' : 'properties';
    });
    const properties$ = map(properties, ([key, value]) => {
        return { '::key': key, '::value': value };
    }, {});
    const dataset$ = map(dataset, ([key, value]) => {
        return { '::key': key, '::value': value };
    }, {});
    const style$ = compact({
        borderRadius,
        width,
        height,
        lineHeight,
        margin,
        marginLeft,
        marginTop,
        marginRight,
        marginBottom,
        overflow,
        overflowX,
        overflowY,
        padding,
        paddingLeft,
        paddingTop,
        paddingRight,
        paddingBottom,
        background,
        fontSize,
        fontFamily,
        fontWeight,
        color,
        textAlign,
        ...properties$,
        ...style
    }, 'nil');
    return (_jsx(TagName, { ref: ref, className: clx(className), style: style$, ...dataset$, children: children }));
});
export default Met;
