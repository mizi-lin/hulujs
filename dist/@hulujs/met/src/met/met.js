import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, useEffect, useRef } from 'react';
import clx from 'classnames';
import { groupBy, isPlainObject, omit } from 'lodash-es';
import { compact, isFalsy, map } from '@hulujs/mu';
import { insertComment, removeTwiceComment, useCombinedRefs } from './utils.js';
import { isDev } from '../env.js';
import MetDynamic from '../met-dynamic/index.js';
import MetGene from '../met-gene/index.js';
import { isFragment, isReactElement } from '../utils/is-react-element.js';
/**
 * 将样式inline化
 */
const inlineDisplay = (inline, display) => {
    if (!inline)
        return {};
    if (isFalsy(display))
        return { display: 'inline' };
    if (inline && ['flex', 'grid', 'table', 'table'].includes(display)) {
        return { display: `inline-${display}` };
    }
    return {};
};
const noneDisplay = (none) => {
    if (!none)
        return {};
    return { display: 'none' };
};
/**
 * 边框默认情况下使用 `1px solid ${color}`,
 * border 的默认值接受单一的颜色值
 * 即 当 border 的配置值不完整的时候，默认补全样式为当前颜色
 */
const adjustBorder = (borderProps) => {
    return compact(map(borderProps, (value) => {
        if (isFalsy(value))
            return void 0;
        const value$ = value.trim();
        return value$.replace(/\([^)]*?\)/g, '').split(' ').length > 1 ? value$ : `1px solid ${value$}`;
    }));
};
/**
 * 当scroll = true 的时候
 * 它只作用于 overflow 与 overflowY
 * overflowX 需用户手动配置
 * 一般情况下，滚动条设定我们只关注纵向滚动条
 * scroll < OverflowY < Overflow < style
 */
const adjustOverflowScroll = (scroll, overflowProps) => {
    if (!scroll)
        return {};
    return isFalsy(overflowProps) ? overflowProps : { overflow: 'auto' };
};
const conditionStyle = (styles) => {
    return map(styles, (style) => {
        if (isPlainObject(style)) {
            const [value, active] = Object.entries(style)[0];
            return active ? value : undefined;
        }
        return style;
    });
};
const adjustPadding = (ptb, plr) => {
    return { ...(ptb ? { paddingTop: ptb, paddingBottom: ptb } : {}), ...(plr ? { paddingLeft: plr, paddingRight: plr } : {}) };
};
/**
 * border 系样式处理
 */
const Met = forwardRef((props, ref) => {
    const innerRef = useRef();
    const ref$ = useCombinedRefs(ref, innerRef);
    const { tag = 'div', children, style = {}, className = '', componentClassName, src, href, alt, inline, none, scroll = false, nogene = false, debug, comment, full, ...extra } = props;
    const crossProps = omit(props, 'children', 'tag', 'componentClassName', 'propCover');
    const TagName = tag;
    const { w, width = w, h, height = h, lh, lineHeight = lh, bd, border = bd, bdt, borderTop = bdt, bdr, borderRight = bdr, bdb, borderBottom = bdb, bdl, borderLeft = bdl, br, borderRadius = br, bg, background = bg, o, overflow, ox, overflowX, oy, overflowY, p, padding = p, pl, paddingLeft = pl, plr, pt, paddingTop = pt, ptb, pr, paddingRight = pr, pb, paddingBottom = pb, m, margin = m, ml, marginLeft = ml, mt, marginTop = mt, mr, marginRight = mr, mb, marginBottom = mb, fs, fontSize = fs, ff, fontFamily = ff, color, fw, fontWeight = fw, ta, textAlign = ta, va, verticalAlign = va, ...more } = conditionStyle(extra);
    const toMap = (value) => {
        return map(value, ([key, value]) => {
            return { '::key': key, '::value': value };
        }, {});
    };
    // 获取  dataset 属性值
    const { properties = [], dataset = [], events = [] } = groupBy(Object.entries(more), ([key]) => {
        return /^(data|aria)-/gi.test(key) ? 'dataset' : /^on[A-Z]/gi.test(key) ? 'events' : 'properties';
    });
    const properties$ = toMap(properties);
    const dataset$ = toMap(dataset);
    const events$ = toMap(events);
    const attr$ = compact({ src, href, alt });
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
        ...adjustPadding(ptb, plr),
        ...adjustOverflowScroll(scroll, { overflow, overflowY }),
        ...adjustBorder({ border, borderTop, borderRight, borderBottom, borderLeft }),
        ...inlineDisplay(inline, extra.display),
        ...noneDisplay(none),
        ...(full ? { width: width ?? '100%', height: height ?? '100%' } : {}),
        ...style
    }, 'nil');
    const props$ = {
        className: clx(componentClassName, className),
        style: style$,
        ...attr$,
        ...dataset$,
        ...events$
    };
    /**
     * fixed bug: img is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`
     * 自封闭标签，没有children, 所以不能使用 dangerouslySetInnerHTML 从而报错
     * 自闭合标签如果写为<img></img>（有时候vsCode会格式化成这样）导致内存溢出
     * @see https://deepscan.io/docs/rules/react-void-element-with-children
     * @see https://www.jianshu.com/p/a7465ee59c6b
     */
    const selfColsingTags = [
        'hr',
        'img',
        'br',
        'input',
        'select',
        'textarea',
        'meta',
        'base',
        'col',
        'area',
        'param',
        'object',
        'applet',
        'embed',
        'keygen',
        'source'
    ];
    useEffect(() => {
        debug?.(props$);
    }, [debug]);
    useEffect(() => {
        if (isDev && ref$?.current && comment) {
            const element = ref$.current;
            removeTwiceComment(element);
            insertComment(element, comment);
        }
    }, [comment, ref$?.current]);
    // 自闭合标签处理
    if (typeof tag === 'string' && selfColsingTags.includes(tag)) {
        return _jsx(TagName, { ref: ref$, className: clx(className), ...props$ });
    }
    // fragment 将属性透传
    if (isFragment(tag)) {
        return (_jsx(MetGene, { dominant: crossProps, propCover: props.propCover ?? true, children: children }));
    }
    // html 标签 / 自定义标签
    if (typeof tag === 'string' || !isReactElement(tag)) {
        return (_jsx(TagName, { ref: ref$, ...props$, children: children }));
    }
    return (_jsx(MetDynamic, { component: tag, ...props$, children: children }));
});
export default Met;
