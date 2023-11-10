import { ElementType, ReactNode } from 'react';
import { isElement, isForwardRef } from 'react-is';
export declare const isReactElement: (componet: any) => boolean;
declare const isFragment$: (tag: ReactNode | ElementType) => any;
export { isFragment$ as isFragment, isElement, isForwardRef };
