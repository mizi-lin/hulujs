import {
    CSSProperties,
    ElementType,
    ReactNode,
    LegacyRef,
    forwardRef,
    ForwardRefRenderFunction,
    DOMAttributes
} from 'react';
import clx, { ArgumentArray } from 'classnames';
import { Property, Properties } from 'csstype';
import { groupBy } from 'lodash-es';
import { compact, map } from '@hulu/mu';

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

    /**
     * 样式类属性
     */
    bg?: Property.Background;
    background?: Property.Background;
    // background
    border?: Property.Border;
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

const Met = forwardRef<LegacyRef<any>, MetProps>((props: MetProps, ref) => {
    const { tag = 'div', children, style = {}, className = '', src, href, alt, ...extra } = props;
    const TagName = tag;
    const {
        w,
        width = w,
        h,
        height = h,
        lh,
        lineHeight = lh,
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

    const attr$ = compact({
        src,
        href,
        alt
    });

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
        },
        'nil'
    );
    return (
        <TagName
            ref={ref}
            className={clx(className)}
            style={style$}
            {...attr$}
            {...dataset$}
            {...events$}
        >
            {children}
        </TagName>
    );
});

export default Met;
