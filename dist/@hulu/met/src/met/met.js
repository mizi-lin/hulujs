import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import clx from 'classnames';
import { groupBy } from 'lodash-es';
import { compact, map } from '@hulu/mu';
const Met = forwardRef((props, ref) => {
    const { tag = 'div', children, style = {}, className = '', src, href, alt, ...extra } = props;
    const TagName = tag;
    const { w, width = w, h, height = h, lh, lineHeight = lh, br, borderRadius = br, bg, background = bg, o, overflow, ox, overflowX, oy, overflowY, p, padding = p, pl, paddingLeft = pl, pt, paddingTop = pt, pr, paddingRight = pr, pb, paddingBottom = pb, m, margin = m, ml, marginLeft = ml, mt, marginTop = mt, mr, marginRight = mr, mb, marginBottom = mb, fs, fontSize = fs, ff, fontFamily = ff, color, fw, fontWeight = fw, ta, textAlign = ta, va, verticalAlign = va, ...more } = extra;
    const toMap = (value) => {
        return map(value, ([key, value]) => {
            return { '::key': key, '::value': value };
        }, {});
    };
    // 获取  dataset 属性值
    const { properties = [], dataset = [], events = [] } = groupBy(Object.entries(more), ([key]) => {
        return /^(data|aria)-/gi.test(key)
            ? 'dataset'
            : /^on[A-Z]/gi.test(key)
                ? 'events'
                : 'properties';
    });
    const properties$ = toMap(properties);
    const dataset$ = toMap(dataset);
    const events$ = toMap(events);
    const attr$ = compact({
        src,
        href,
        alt
    });
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
    return (_jsx(TagName, { ref: ref, className: clx(className), style: style$, ...attr$, ...dataset$, ...events$, children: children }));
});
export default Met;
