import { jsx as _jsx } from "react/jsx-runtime";
import Met from './met.js';
import { forwardRef } from 'react';
export const Div = forwardRef((props, ref) => {
    return _jsx(Met, { tag: "div", ref: ref, ...props });
});
export const Section = forwardRef((props, ref) => {
    return _jsx(Met, { tag: "section", ref: ref, ...props });
});
export const Span = forwardRef((props, ref) => {
    return _jsx(Met, { tag: "span", ref: ref, ...props });
});
export const Label = forwardRef((props, ref) => {
    return _jsx(Met, { tag: "label", ref: ref, ...props });
});
export const Article = forwardRef((props, ref) => {
    return _jsx(Met, { tag: "article", ref: ref, ...props });
});
export const Main = forwardRef((props, ref) => {
    return _jsx(Met, { tag: "main", ref: ref, ...props });
});
export const Header = forwardRef((props, ref) => {
    return _jsx(Met, { tag: "header", ref: ref, ...props });
});
export const Nav = forwardRef((props, ref) => {
    return _jsx(Met, { tag: "nav", ref: ref, ...props });
});
