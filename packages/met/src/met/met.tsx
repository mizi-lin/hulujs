import { CSSProperties, ElementType, FC, ReactNode, LegacyRef, forwardRef } from 'react';
import clx, { ArgumentArray } from 'classnames';
import { Property } from 'csstype';
import { compact } from '@hulu/mu';

export interface MetProps {
    // Tag 名称
    tag?: ElementType;
    background?: Property.Background;
    // background
    bg?: Property.Background;
    border?: Property.Border;
    // border-radius
    br?: Property.BorderRadius | number;
    borderRadius?: Property.BorderRadius | number;
    bottom?: number | string;
    children?: ReactNode;
    className?: ArgumentArray;
    cursor?: Property.Cursor;
    display?: Property.Display;
    flex?: Property.Flex;
    // font
    fontSize?: Property.FontSize | number;
    // font-size
    fs?: Property.FontSize | number;
    // font-family
    ff?: Property.FontFamily;
    fontFamily?: Property.FontFamily;
    // font-weight
    fw?: number;
    fontWeight?: Property.FontWeight;
    gap?: Property.Gap;
    // height
    h?: number | string;
    height?: number | string;
    // line-height
    lh?: Property.LineHeight;
    lineHeight?: Property.LineHeight;
    left?: number | string;
    // margin
    m?: number | string;
    margin?: number | string;
    // margin-left
    ml?: Property.MarginLeft | number;
    // margin-top
    mt?: Property.MarginTop | number;
    // margin-right
    mr?: Property.MarginRight | number;
    // margin-bottom
    mb?: Property.MarginBottom | number;
    marginLeft?: Property.MarginLeft | number;
    marginTop?: Property.MarginTop | number;
    marginRight?: Property.MarginRight | number;
    marginBottom?: Property.MarginBottom | number;
    maxHeight?: string | number;
    minHeight?: string | number;
    maxWidth?: string | number;
    minWidth?: string | number;
    overflow?: Property.Overflow;
    overflowX?: Property.OverflowX;
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
    position?: Property.Position;
    ref?: LegacyRef;
    right?: number | string;
    // text-align
    ta?: Property.TextAlign;
    textAlign?: Property.TextAlign;
    top?: number | string;
    style?: CSSProperties;
    // vertical-align
    va?: Property.VerticalAlign;
    verticalAlign?: Property.VerticalAlign;
    // width
    w?: number | string;
    width?: number | string;
}

const Met: FC<MetProps> = forwardRef((props, ref) => {
    const {
        w,
        h,
        width = w,
        height = h,
        className,
        cursor,
        style = {},
        tag = 'div',
        position,
        top,
        right,
        bottom,
        left,
        lh,
        lineHeight = lh,
        bg,
        background = bg,
        overflow,
        overflowX,
        overflowY,
        p,
        padding = p,
        pl,
        pt,
        pr,
        pb,
        paddingLeft = pl,
        paddingTop = pt,
        paddingRight = pr,
        paddingBottom = pb,
        m,
        margin = m,
        ml,
        mt,
        mr,
        mb,
        marginLeft = ml,
        marginTop = mt,
        marginRight = mr,
        marginBottom = mb,
        maxHeight,
        minHeight,
        maxWidth,
        minWidth,
        display,
        flex,
        fs,
        fontSize = fs,
        ff,
        fontFamily = ff,
        fw,
        fontWeight = fw,
        gap,
        children,
        ta,
        textAlign = ta,
        va,
        verticalAlign = va,
        ...extraProps
    } = props;
    const TagName = tag;
    const style$ = compact(
        {
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
        },
        'nil'
    );
    return (
        <TagName ref={ref} className={clx(className)} style={style$}>
            {children}
        </TagName>
    );
});

export default Met;
