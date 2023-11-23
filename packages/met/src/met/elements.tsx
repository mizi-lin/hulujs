import { type } from 'os';
import Met, { MetProps } from './met.js';
import { ForwardedRef, forwardRef } from 'react';

export type ElementProps = Omit<MetProps, 'tag'>;

export const Div = forwardRef((props: ElementProps, ref: ForwardedRef<HTMLDivElement>) => {
    return <Met tag="div" ref={ref} {...props} />;
});

export const Section = forwardRef((props: ElementProps, ref: ForwardedRef<HTMLElement>) => {
    return <Met tag="section" ref={ref} {...props} />;
});

export const Span = forwardRef((props: ElementProps, ref: ForwardedRef<HTMLSpanElement>) => {
    return <Met tag="span" ref={ref} {...props} />;
});

export const Label = forwardRef((props: ElementProps, ref: ForwardedRef<HTMLLabelElement>) => {
    return <Met tag="label" ref={ref} {...props} />;
});

export const Article = forwardRef((props: ElementProps, ref: ForwardedRef<HTMLElement>) => {
    return <Met tag="article" ref={ref} {...props} />;
});

export const Main = forwardRef((props: ElementProps, ref: ForwardedRef<HTMLElement>) => {
    return <Met tag="main" ref={ref} {...props} />;
});

export const Header = forwardRef((props: ElementProps, ref: ForwardedRef<HTMLElement>) => {
    return <Met tag="header" ref={ref} {...props} />;
});

export const Nav = forwardRef((props: ElementProps, ref: ForwardedRef<HTMLElement>) => {
    return <Met tag="nav" ref={ref} {...props} />;
});
