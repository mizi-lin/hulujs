import { flatten } from 'lodash-es';
/**
 * parisToEntries
 * 将 KvParis 的数据类型 转为 KvEntries 的数据类型
 * - 应用场景
 * -- 插件体系
 */
const parisToEntries = (paris = {}) => {
    // 数组的三种情况
    // Record<string, MSetValue>[] | [string, MSetValue] | [string, MSetValue][];
    // 可以由数组的第一个元素推断出数组的类型
    if (Array.isArray(paris)) {
        const [first] = paris;
        if (typeof first === 'string' || typeof first === 'number')
            return [paris.slice(0, 2)];
        if (Array.isArray(first))
            return paris;
        return flatten(paris.map((item) => Object.entries(item)));
    }
    return Object.entries(paris);
};
export default parisToEntries;
