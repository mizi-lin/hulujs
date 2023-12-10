import { cloneDeep } from 'lodash-es';
import each from './each.js';
import includes from './includes.js';
import mget, { propPathToCash } from './mget.js';
import upArray from './up-array.js';
/**
 * baseValue
 * 将传入的value值进行处理，
 * 如果非函数直接返回
 * 如果是函数，则返回函数执行后的结果
 * 即若实际需求是写入函数，则需要以嵌套函数的形式传入
 * value值是函数，自带两个参数
 * - current 当前path指向的值
 * - obj: 当前原值freeze，避免开发者误修改
 * @param obj
 * @param path
 * @param value
 * @returns
 */
const baseValue = (obj, path, value) => {
    if (typeof value === 'function') {
        const current = mget(obj, path, 'detail');
        return value(current, Object.freeze(cloneDeep(obj)));
    }
    return value;
};
/**
 * baseSet
 * 将传入的value值写入obj
 * @param obj
 * @param path
 * @param value
 * @returns
 */
const baseSet = (obj, path, value) => {
    const cash = propPathToCash(path);
    if (cash.length === 1) {
        // 直到写入值的时候才 baseValue 进行转换
        obj[cash[0]] = baseValue(obj, path, value);
    }
    else {
        const [head, ...tail] = cash;
        obj[head] ??= {};
        baseSet(obj[head], tail, value);
    }
};
/**
 * mset
 * 将 value 按属性链写入 obj
 * @param obj
 * @param path
 * @param value
 * @returns
 */
const mset = (obj, path, value) => {
    const cash = propPathToCash(path);
    if (includes(cash, ['*', '**'])) {
        const data = mget(obj, cash, 'detail');
        return each(upArray(data), (item) => {
            const { cash } = item;
            baseSet(obj, cash, value);
        });
    }
    return baseSet(obj, cash, value);
};
export default mset;
