/**
 * 按某项，对数组一分为二
 */
const dichotomy = (arr, item, of = 'indexOf') => {
    const index = arr[of]?.(item);
    return [arr.slice(0, index), arr.slice(index + 1)];
};
export default dichotomy;
