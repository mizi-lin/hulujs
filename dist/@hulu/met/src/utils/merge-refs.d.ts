import { MutableRefObject, LegacyRef, RefCallback } from 'react';
/**
 * 支持多个ref
 * https://github.com/gregberge/react-merge-refs
 * @param refs
 */
export declare function mergeRefs<T = any>(refs: Array<MutableRefObject<T> | LegacyRef<T> | undefined | null>): RefCallback<T>;
