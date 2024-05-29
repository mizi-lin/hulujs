import isNil from './is-nil.js';
/**
 * 若原值不是数组，则返回数组 ~
 * @param item
 * @returns
 */
export default function upArray(item) {
    if (Array.isArray(item))
        return item;
    if (isNil(item))
        return [];
    return [item];
}
