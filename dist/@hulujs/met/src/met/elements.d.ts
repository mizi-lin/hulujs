/// <reference types="react" />
import { MetProps } from './met.js';
export type ElementProps = Omit<MetProps, 'tag'>;
export declare const Div: import("react").ForwardRefExoticComponent<Omit<ElementProps, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export declare const Section: import("react").ForwardRefExoticComponent<Omit<ElementProps, "ref"> & import("react").RefAttributes<HTMLElement>>;
export declare const Span: import("react").ForwardRefExoticComponent<Omit<ElementProps, "ref"> & import("react").RefAttributes<HTMLSpanElement>>;
export declare const Label: import("react").ForwardRefExoticComponent<Omit<ElementProps, "ref"> & import("react").RefAttributes<HTMLLabelElement>>;
export declare const Article: import("react").ForwardRefExoticComponent<Omit<ElementProps, "ref"> & import("react").RefAttributes<HTMLElement>>;
export declare const Main: import("react").ForwardRefExoticComponent<Omit<ElementProps, "ref"> & import("react").RefAttributes<HTMLElement>>;
export declare const Header: import("react").ForwardRefExoticComponent<Omit<ElementProps, "ref"> & import("react").RefAttributes<HTMLElement>>;
export declare const Nav: import("react").ForwardRefExoticComponent<Omit<ElementProps, "ref"> & import("react").RefAttributes<HTMLElement>>;
