import { isNil, isPlainObject } from 'lodash-es';
import { cashToPropPath } from './tile.js';
/**
 * parisToEntries
 * 将 KvParis 的数据类型 转为 KvEntries 的数据类型
 * - 应用场景
 * -- 插件体系
 */
// const parisToEntries = (paris: KvParis = {}): KvEntries => {
//     // 数组的三种情况
//     // Record<string, MSetValue>[] | [string, MSetValue] | [string, MSetValue][];
//     // 可以由数组的第一个元素推断出数组的类型
//     if (Array.isArray(paris)) {
//         const [first] = paris;
//         if (typeof first === 'string' || typeof first === 'number') return [paris.slice(0, 2)] as KvEntries;
//         if (Array.isArray(first)) return paris as KvEntries;
//         return flatten(paris.map((item) => Object.entries(item))) as KvEntries;
//     }
//     return Object.entries(paris);
// };
/**
 * isEntries(entries: any[])
 * 一个由给定对象自有的可枚举字符串键属性的键值对组成的数组。
 * 每个键值对都是一个包含两个元素的数组：第一个元素是属性的键（始终是字符串），第二个元素是属性值。
 */
const isEntriesItem = (entries) => {
    if (!Array.isArray(entries) || entries.length !== 2)
        return false;
    const [key] = entries;
    return typeof key === 'string';
};
/**
 * 将Paris键值对的数据转成Entires二元组数组格式
 * @param paris
 * @returns
 */
// parisToEntries({a: 1})
// -> [[a, 1]]
// parisToEntries({a: 1, b: 2})
// -> [[a, 1], [b, 2]]
// parisToEntries([a, 1])
// -> [[a, 1]]
// parisToEntries([[a, 1], [b, 2]])
// -> [[a, 1], [b, 2]]
// parisToEntries([[a, 1], {b: 2}])
// -> [[a, 1], [b, 2]]
// parisToEntries([[a, 1], {b: 2, c: 3}])
// -> [[a, 1], [b, 2], [c, 3]]
// parisToEntries([[a, 1], {b: 2, c: 3}, { d: 4}])
// -> [[a, 1], [b, 2], [c, 3], [d, 4]]
// parisToEntries([[a, 1], {b: 2, c: 3}, { d: 4}, [{e: 5}]])
// -> [[a, 1], [b, 2], [c, 3], [d, 4], [e, 5]]
const parisToEntries = (paris = {}, value) => {
    if (isNil(paris))
        return [];
    if (!isNil(value))
        return [[cashToPropPath(paris), value]];
    // 当值是对象的时候, 直接转为键值对
    if (isPlainObject(paris))
        return Object.entries(paris);
    // 直接是键值对，则返回键值对集合
    if (isEntriesItem(paris))
        return [paris];
    if (Array.isArray(paris)) {
        return paris.reduce((temp, item) => {
            if (isPlainObject(item))
                return [...temp, ...Object.entries(item)];
            if (isEntriesItem(item))
                return [...temp, item];
            return [...temp, ...parisToEntries(item)];
        }, []);
    }
    return [];
};
export default parisToEntries;
