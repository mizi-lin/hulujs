/**
 * 支持多个ref
 * https://github.com/gregberge/react-merge-refs
 * @param refs
 */
export function mergeRefs(refs) {
    return (value) => {
        refs.forEach((ref) => {
            if (typeof ref === 'function') {
                ref(value);
            }
            else if (ref != null) {
                ref.current = value;
            }
        });
    };
}
