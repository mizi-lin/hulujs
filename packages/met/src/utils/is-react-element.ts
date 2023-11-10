import { ElementType, ReactNode } from 'react';
import {
    isAsyncMode,
    isContextConsumer,
    isContextProvider,
    isElement,
    isForwardRef,
    isFragment,
    isLazy,
    isMemo,
    isPortal,
    isProfiler,
    isStrictMode,
    isSuspense,
    isValidElementType,
    Fragment
} from 'react-is';

export const isReactElement = (componet: any) => {
    const functions = [
        isElement,
        isForwardRef,
        isFragment,
        isSuspense,
        isLazy,
        isAsyncMode,
        isMemo,
        isContextConsumer,
        isContextProvider,
        isProfiler,
        isPortal,
        isStrictMode
    ];

    for (const func of functions) {
        if (func(componet)) {
            return true;
        }
    }

    return false;
};

const isFragment$ = (tag: ReactNode | ElementType) => {
    if (isValidElementType(tag)) return tag === Fragment;
    return isFragment(tag);
};

export { isFragment$ as isFragment, isElement, isForwardRef };
