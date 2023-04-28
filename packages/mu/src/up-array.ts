/**
 * 若原值不是数组，则返回数组 ~
 * @param item
 * @returns
 */
export default function upArray(item: any) {
    if (Array.isArray(item)) return item;
    return [item];
}
