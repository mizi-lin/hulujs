import upArray from './up-array.js';
/**
 * 判断数组是否包含指定元素
 * @param arr - 要判断的数组
 * @param compare - 要比较的元素或数组
 * @param fromIndex - 比较的起始索引，默认为0
 * @returns 如果数组包含指定元素则返回true，否则返回false
 */
export default function includes(arr, compare, fromIndex = 0) {
    let result = false;
    for (const item of upArray(compare)) {
        if (arr.includes(item, fromIndex)) {
            result = true;
            break;
        }
    }
    return result;
}
export const contains = includes;
