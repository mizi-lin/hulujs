import { ElementType, ReactNode } from 'react';
import { isElement, isForwardRef } from 'react-is';
/**
 * 导出一个函数，用于判断传入的参数是否为React元素
 */
export declare const isReactElement: (componet: any) => boolean;
/**
 * 判断传入的参数tag是否为Fragment
 */
declare const isFragment$: (tag: ReactNode | ElementType) => any;
/**
 * 简单版认定为html element
 * https://github.com/facebook/react/issues/12369
 */
declare const isHTMLElement: (element: ReactNode | ElementType) => any;
export { isFragment$ as isFragment, isHTMLElement, isElement, isForwardRef };
