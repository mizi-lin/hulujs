import { CSSProperties, ElementType, DOMAttributes, PropsWithChildren, FC } from 'react';
import { ArgumentArray } from 'classnames';
import { Property, Properties } from 'csstype';
export type MetClassName = ArgumentArray | string;
export interface MetProps extends PropsWithChildren<any>, Properties<string | number, any>, Omit<DOMAttributes<any>, 'children'> {
    /**
     * 基本属性
     */
    tag?: ElementType;
    style?: CSSProperties;
    className?: MetClassName;
    componentClassName?: MetClassName;
    src?: string;
    alt?: string;
    href?: string;
    inline?: boolean;
    none?: boolean;
    full?: boolean;
    nogene?: boolean;
    debug?: (props: any) => void;
    comment?: string;
    /**
     * 样式类属性
     */
    bg?: Property.Background;
    background?: Property.Background;
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
    br?: Property.BorderRadius | number;
    borderRadius?: Property.BorderRadius | number;
    fontSize?: Property.FontSize | number;
    color?: Property.Color;
    fs?: Property.FontSize | number;
    ff?: Property.FontFamily;
    fontFamily?: Property.FontFamily;
    fw?: number;
    fontWeight?: Property.FontWeight;
    gap?: Property.Gap | number;
    h?: number | string;
    height?: number | string;
    lh?: Property.LineHeight;
    lineHeight?: Property.LineHeight;
    m?: number | string;
    margin?: number | string;
    ml?: Property.MarginLeft | number;
    marginLeft?: Property.MarginLeft | number;
    mt?: Property.MarginTop | number;
    marginTop?: Property.MarginTop | number;
    mr?: Property.MarginRight | number;
    marginRight?: Property.MarginRight | number;
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
    p?: number | string;
    padding?: number | string;
    pl?: Property.PaddingLeft | number;
    pt?: Property.PaddingTop | number;
    pr?: Property.PaddingRight | number;
    pb?: Property.PaddingBottom | number;
    paddingLeft?: Property.PaddingLeft | number;
    paddingTop?: Property.PaddingTop | number;
    paddingRight?: Property.PaddingRight | number;
    paddingBottom?: Property.PaddingBottom | number;
    position?: Property.Position;
    top?: number | string;
    right?: number | string;
    left?: number | string;
    bottom?: number | string;
    ta?: Property.TextAlign;
    textAlign?: Property.TextAlign;
    va?: Property.VerticalAlign;
    verticalAlign?: Property.VerticalAlign;
    visibility?: Property.Visibility;
    w?: number | string;
    width?: number | string;
}
/**
 * border 系样式处理
 */
declare const Met: FC<MetProps>;
export default Met;
