import { MutableRefObject, LegacyRef, RefCallback } from 'react';

/**
 * 支持多个ref
 * https://github.com/gregberge/react-merge-refs
 * @param refs
 */
export function mergeRefs<T = any>(
    refs: Array<MutableRefObject<T> | LegacyRef<T> | undefined | null>
): RefCallback<T> {
    return (value) => {
        refs.forEach((ref) => {
            if (typeof ref === 'function') {
                ref(value);
            } else if (ref != null) {
                (ref as MutableRefObject<T | null>).current = value;
            }
        });
    };
}
