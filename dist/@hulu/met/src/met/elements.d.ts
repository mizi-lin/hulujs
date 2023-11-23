/// <reference types="react" resolution-mode="require"/>
import { MetProps } from './met.js';
export type ElementProps = Omit<MetProps, 'tag'>;
export declare const Div: import("react").ForwardRefExoticComponent<ElementProps & import("react").RefAttributes<HTMLDivElement>>;
export declare const Section: import("react").ForwardRefExoticComponent<ElementProps & import("react").RefAttributes<HTMLElement>>;
export declare const Span: import("react").ForwardRefExoticComponent<ElementProps & import("react").RefAttributes<HTMLSpanElement>>;
export declare const Label: import("react").ForwardRefExoticComponent<ElementProps & import("react").RefAttributes<HTMLLabelElement>>;
export declare const Article: import("react").ForwardRefExoticComponent<ElementProps & import("react").RefAttributes<HTMLElement>>;
export declare const Main: import("react").ForwardRefExoticComponent<ElementProps & import("react").RefAttributes<HTMLElement>>;
export declare const Header: import("react").ForwardRefExoticComponent<ElementProps & import("react").RefAttributes<HTMLElement>>;
export declare const Nav: import("react").ForwardRefExoticComponent<ElementProps & import("react").RefAttributes<HTMLElement>>;
