import { CSSProperties, ElementType, ReactNode, LegacyRef, forwardRef, DOMAttributes } from 'react';
import clx, { ArgumentArray } from 'classnames';
import { Property, Properties } from 'csstype';
import { groupBy } from 'lodash-es';
import { compact, isFalsy, map } from '@hulu/mu';
import { MetDynamic, MetGene, isFragment } from '../index.js';
import * as ReactIs from 'react-is';

export type MetClassName = ArgumentArray | string;
export interface MetProps extends Properties<string | number, any>, DOMAttributes<any> {
    /**
     * 基本属性
     */
    tag?: ElementType;
    style?: CSSProperties;
    children?: ReactNode;
    className?: MetClassName;
    src?: string;
    alt?: string;
    href?: string;
    // 将display转成inline模式
    inline?: boolean;
    // 将display转出none模式
    none?: boolean;

    /**
     * 样式类属性
     */
    // background
    bg?: Property.Background;
    background?: Property.Background;
    // boderder
    bd?: Property.Color | Property.Border;
    border?: Property.Color | Property.Border;
    bdt?: Property.Color | Property.BorderTop;
    borderTop?: Property.Color | Property.BorderTop;
    bdr?: Property.Color | Property.BorderRight;
    borderRight?: Property.Color | Property.BorderRight;
    bdb?: Property.Color | Property.BorderBottom;
    borderBottom?: Property.Color | Property.BorderBottom;
    bdl?: Property.Color | Property.BorderLeft;
    borderLeft?: Property.Color | Property.BorderLeft;
    // border-radius
    br?: Property.BorderRadius | number;
    borderRadius?: Property.BorderRadius | number;
    // cursor?: Property.Cursor;
    // display?: Property.Display;
    // flex?: Property.Flex;
    // flexDirection?: Property.FlexDirection;
    // flexWrap?: Property.FlexWrap;
    // flexFlow?: Property.FlexFlow;
    // flexBasis?: Property.FlexBasis;
    // flexGlow?: Property.FlexGrow;
    // flexShrink?: Property.FlexShrink;
    // justifyContent?: Property.JustifyContent;
    // justifyItems?: Property.JustifyItems;
    // alignContent?: Property.AlignContent;
    // alignItems?: Property.AlignItems;

    // font
    fontSize?: Property.FontSize | number;
    color?: Property.Color;
    // font-size
    fs?: Property.FontSize | number;
    // font-family
    ff?: Property.FontFamily;
    fontFamily?: Property.FontFamily;
    // font-weight
    fw?: number;
    fontWeight?: Property.FontWeight;
    gap?: Property.Gap | number;
    // height
    h?: number | string;
    height?: number | string;
    // line-height
    lh?: Property.LineHeight;
    lineHeight?: Property.LineHeight;
    // margin
    m?: number | string;
    margin?: number | string;
    // margin-left
    ml?: Property.MarginLeft | number;
    marginLeft?: Property.MarginLeft | number;
    // margin-top
    mt?: Property.MarginTop | number;
    marginTop?: Property.MarginTop | number;
    // margin-right
    mr?: Property.MarginRight | number;
    marginRight?: Property.MarginRight | number;
    // margin-bottom
    mb?: Property.MarginBottom | number;
    marginBottom?: Property.MarginBottom | number;
    maxHeight?: string | number;
    minHeight?: string | number;
    maxWidth?: string | number;
    minWidth?: string | number;
    o?: Property.Overflow;
    overflow?: Property.Overflow;
    ox?: Property.OverflowX;
    overflowX?: Property.OverflowX;
    oy?: Property.OverflowY;
    overflowY?: Property.OverflowY;
    scroll?: boolean;
    // padding
    p?: number | string;
    padding?: number | string;
    // padding-left
    pl?: Property.PaddingLeft | number;
    // padding-top
    pt?: Property.PaddingTop | number;
    // padding-right
    pr?: Property.PaddingRight | number;
    // padding-bottom
    pb?: Property.PaddingBottom | number;
    paddingLeft?: Property.PaddingLeft | number;
    paddingTop?: Property.PaddingTop | number;
    paddingRight?: Property.PaddingRight | number;
    paddingBottom?: Property.PaddingBottom | number;

    // Viewport
    position?: Property.Position;
    top?: number | string;
    right?: number | string;
    left?: number | string;
    bottom?: number | string;

    // text-align
    ta?: Property.TextAlign;
    textAlign?: Property.TextAlign;
    // vertical-align
    va?: Property.VerticalAlign;
    verticalAlign?: Property.VerticalAlign;
    visibility?: Property.Visibility;
    // width
    w?: number | string;
    width?: number | string;
}

/**
 * 将样式inline化
 */
const inlineDisplay = (inline, display?: Property.Display): Record<string, any> => {
    if (!inline) return {};
    if (isFalsy(display)) return { display: 'inline' };
    if (['flex', 'grid', 'table', 'table'].includes(display!)) {
        return { display: `inline-${display}` };
    }
    return {};
};

const noneDisplay = (none) => {
    if (!none) return {};
    return { display: 'none' };
};

/**
 * 边框默认情况下使用 `1px solid ${color}`,
 * border 的默认值接受单一的颜色值
 * 即 当 border 的配置值不完整的时候，默认补全样式为当前颜色
 */
const adjustBorder = (borderProps: Record<string, any>) => {
    return compact(
        map(borderProps, (value) => {
            if (isFalsy(value)) return void 0;
            const value$ = value.trim();
            return value$.replace(/\([^)]*?\)/g, '').split(' ').length > 1
                ? value$
                : `1px solid ${value$}`;
        })
    );
};

/**
 * 当scroll = true 的时候
 * 它只作用于 overflow 与 overflowY
 * overflowX 需用户手动配置
 * 一般情况下，滚动条设定我们只关注纵向滚动条
 * scroll < OverflowY < Overflow < style
 */
const adjustOverflowScroll = (scroll: boolean, overflowProps?: Record<string, any>) => {
    if (!scroll) return {};
    return isFalsy(overflowProps) ? overflowProps : { OverflowY: 'auto' };
};

/**
 * border 系样式处理
 */

const Met = forwardRef<LegacyRef<any>, MetProps>((props: MetProps, ref) => {
    const {
        tag = 'div',
        children,
        style = {},
        className = '',
        src,
        href,
        alt,
        inline,
        none,
        scroll = false,
        ...extra
    } = props;
    const TagName = tag;
    const {
        w,
        width = w,
        h,
        height = h,
        lh,
        lineHeight = lh,
        bd,
        border = bd,
        bdt,
        borderTop = bdt,
        bdr,
        borderRight = bdr,
        bdb,
        borderBottom = bdb,
        bdl,
        borderLeft = bdl,
        br,
        borderRadius = br,
        bg,
        background = bg,
        o,
        overflow,
        ox,
        overflowX,
        oy,
        overflowY,
        p,
        padding = p,
        pl,
        paddingLeft = pl,
        pt,
        paddingTop = pt,
        pr,
        paddingRight = pr,
        pb,
        paddingBottom = pb,
        m,
        margin = m,
        ml,
        marginLeft = ml,
        mt,
        marginTop = mt,
        mr,
        marginRight = mr,
        mb,
        marginBottom = mb,
        fs,
        fontSize = fs,
        ff,
        fontFamily = ff,
        color,
        fw,
        fontWeight = fw,
        ta,
        textAlign = ta,
        va,
        verticalAlign = va,
        ...more
    } = extra;

    const toMap = (value) => {
        return map(
            value,
            ([key, value]) => {
                return { '::key': key, '::value': value };
            },
            {}
        );
    };

    // 获取  dataset 属性值
    const {
        properties = [],
        dataset = [],
        events = []
    } = groupBy(Object.entries(more), ([key]) => {
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

    const style$ = compact(
        {
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
        },
        'nil'
    );

    const props$ = {
        ref,
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

    if (typeof tag === 'string' && selfColsingTags.includes(tag)) {
        return <TagName className={clx(className)} {...props$} />;
    }

    return (
        <TagName {...(isFragment(tag) ? {} : props$)}>
            <MetDynamic component={MetGene} dominant={props$} inactvie={!isFragment(tag)}>
                {children}
            </MetDynamic>
        </TagName>
    );
});

export default Met;
