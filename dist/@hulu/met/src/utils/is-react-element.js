import { isContextConsumer, isContextProvider, isElement, isForwardRef, isFragment, isLazy, isMemo, isPortal, isProfiler, isStrictMode, isSuspense, isValidElementType, Fragment } from 'react-is';
/**
 * 导出一个函数，用于判断传入的参数是否为React元素
 */
export const isReactElement = (componet) => {
    // 定义一个函数数组，用于判断传入的参数是否为React元素
    const functions = [
        isElement,
        isForwardRef,
        isFragment,
        isSuspense,
        isLazy,
        isMemo,
        isContextConsumer,
        isContextProvider,
        isProfiler,
        isPortal,
        isStrictMode
    ];
    // 遍历函数数组，判断传入的参数是否为React元素
    for (const func of functions) {
        if (func(componet)) {
            return true;
        }
    }
    // 如果传入的参数不是React元素，则返回false
    return false;
};
/**
 * 判断传入的参数tag是否为Fragment
 */
const isFragment$ = (tag) => {
    // 判断传入的参数tag是否为ReactNode或ElementType
    if (isValidElementType(tag))
        return tag === Fragment;
    // 判断传入的参数tag是否为Fragment
    return isFragment(tag);
};
/**
 * 简单版认定为html element
 * https://github.com/facebook/react/issues/12369
 */
const isHTMLElement = (element) => {
    if (typeof element === 'string')
        return isValidElementType(element);
    if (typeof element?.['type'] === 'string')
        return isValidElementType(element?.['type']);
    return false;
};
export { isFragment$ as isFragment, isHTMLElement, isElement, isForwardRef };
