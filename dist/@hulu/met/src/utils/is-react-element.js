import { isAsyncMode, isContextConsumer, isContextProvider, isElement, isForwardRef, isFragment, isLazy, isMemo, isPortal, isProfiler, isStrictMode, isSuspense } from 'react-is';
export const isReactElement = (componet) => {
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
