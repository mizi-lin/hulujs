import { cloneDeep, curry } from 'lodash-es';
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
 * - options 原值
 * - prev: 最后一层的值
 * - value: 当前的值
 * - cash: 当前的属性链信息
 * - get: get(path), 基于options的get方法
 * @param obj
 * @param path
 * @param value
 * @param valueMode 嵌套函数模式
 * @returns
 */
const baseValue = (obj, path, value, valueMode, source) => {
    if (typeof value === 'function' && valueMode === 'nest') {
        const current = mget(obj, path);
        const { options, path: path$, cash } = source;
        const get = curry(mget)(options ?? {});
        return value({ prev: Object.freeze(cloneDeep(obj)), value: current, path: path$, cash, options, get });
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
const baseSet = (obj, path, value, valueMode, source) => {
    const cash = propPathToCash(path);
    if (cash.length === 1) {
        // 直到写入值的时候才 baseValue 进行转换
        const value$ = baseValue(obj, path, value, valueMode, source);
        if (value$ !== '::skip') {
            obj[cash[0]] = value$;
        }
    }
    else {
        const [head, ...tail] = cash;
        obj[head] ??= {};
        baseSet(obj[head], tail, value, valueMode, source);
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
const mset = (obj, path, value, valueMode = 'normal') => {
    const cash = propPathToCash(path);
    const options = Object.freeze(cloneDeep(obj));
    const source = { options, path, cash };
    if (includes(cash, ['*', '**'])) {
        const data = mget(obj, cash, 'detail');
        return each(upArray(data), (item) => {
            const { cash } = item;
            source.cash = cash;
            baseSet(obj, cash, value, valueMode, source);
        });
    }
    return baseSet(obj, cash, value, valueMode, source);
};
export default mset;
