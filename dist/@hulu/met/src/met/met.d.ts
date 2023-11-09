import { CSSProperties, ElementType, ReactNode, LegacyRef, DOMAttributes } from 'react';
import { ArgumentArray } from 'classnames';
import { Property, Properties } from 'csstype';
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
    border?: Property.Border;
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
declare const Met: import("react").ForwardRefExoticComponent<MetProps & import("react").RefAttributes<LegacyRef<any>>>;
export default Met;
