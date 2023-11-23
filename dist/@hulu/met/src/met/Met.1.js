import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, useEffect, useRef } from 'react';
import clx from 'classnames';
import { groupBy } from 'lodash-es';
import { compact, map } from '@hulu/mu';
import { MetDynamic, MetGene, isFragment } from '../index.js';
import { useCombinedRefs } from './utils.js';
import { adjustOverflowScroll, adjustBorder, inlineDisplay, noneDisplay } from './met.js';
/**
 * border 系样式处理
 */
export const Met = forwardRef((props, ref) => {
    const innerRef = useRef();
    const ref$ = useCombinedRefs(ref, innerRef);
    const { tag = 'div', children, style = {}, className = '', src, href, alt, inline, none, scroll = false, debug, comment, ...extra } = props;
    const TagName = tag;
    const { w, width = w, h, height = h, lh, lineHeight = lh, bd, border = bd, bdt, borderTop = bdt, bdr, borderRight = bdr, bdb, borderBottom = bdb, bdl, borderLeft = bdl, br, borderRadius = br, bg, background = bg, o, overflow, ox, overflowX, oy, overflowY, p, padding = p, pl, paddingLeft = pl, pt, paddingTop = pt, pr, paddingRight = pr, pb, paddingBottom = pb, m, margin = m, ml, marginLeft = ml, mt, marginTop = mt, mr, marginRight = mr, mb, marginBottom = mb, fs, fontSize = fs, ff, fontFamily = ff, color, fw, fontWeight = fw, ta, textAlign = ta, va, verticalAlign = va, ...more } = extra;
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
        ...adjustOverflowScroll(scroll, { overflow, overflowY }),
        ...adjustBorder({ border, borderTop, borderRight, borderBottom, borderLeft }),
        ...inlineDisplay(inline, extra.display),
        ...noneDisplay(none),
        ...properties$,
        ...style
    }, 'nil');
    const props$ = {
        className: clx(className),
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
    const commentor = comment ? document.createComment(comment) : undefined;
    useEffect(() => {
        // const ref$ = innerRef as MutableRefObject<any>;
        if (ref$?.current && commentor) {
            const element = ref$.current;
            try {
                // 删除历史
                const parent = element.parentElement;
                const nodes = Array.from(parent.childNodes);
                console.log('...', nodes);
                // 获取 parent childnodes 里的 comment
                for (const node of nodes) {
                    // 只删除连续的 comment node
                    // comment.nodeType === 8
                    const isTwice = node.nodeType === 8 &&
                        node.nextElementSibling?.nodeType === 8;
                    isTwice ? node.parentElement?.removeChild(node) : ;
                    break;
                }
                // element.parentElement?.removeChild?.(commentor);
            }
            catch (e) { }
            element.before(commentor);
        }
    }, [commentor]);
    // 自闭合标签处理
    if (typeof tag === 'string' && selfColsingTags.includes(tag)) {
        return _jsx(TagName, { ref: ref$, className: clx(className), ...props$ });
    }
    return (
    // 当 tag = Fragment 时，为透传标签
    _jsx(TagName, { ref: ref$, ...(isFragment(tag) ? {} : props$), children: _jsx(MetDynamic, { component: MetGene, dominant: props$, inactvie: !isFragment(tag), children: children }) }));
});
