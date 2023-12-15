import { cloneDeep, curry, isNil, isObject } from 'lodash-es';
import each from './each.js';
import includes from './includes.js';
import mget, { propPathToCash } from './mget.js';
import upArray from './up-array.js';
import { SetValue, PropPaths, SetValueMode } from '@hulujs/types';
import tryNumber from './try-number.js';
import map from './map.js';

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
const baseValue = (obj: Record<string, any>, path: PropPaths, value: any, valueMode: SetValueMode, source: Record<string, any>) => {
    // console.log('baseValue', obj, path, value, valueMode, source);
    if (typeof value === 'function' && valueMode === 'nest') {
        const current = mget(obj, path);
        const { options, currentCash, ...extra } = source;

        const get = curry(mget)(options ?? {});
        const wildcard$1 = map(source.cash, (value, inx) => {
            if (value === '*' || value === '**') {
                const wildcardCash = (currentCash as string[]).slice(0, +inx + 1);
                return get(wildcardCash);
            }
            return '::break';
        });
        const wildcard$2 = map(wildcard$1, (value, inx) => ({ '::key': `$${inx}`, '::value': value }), {});
        return value({
            value: current,
            current: { options: current, inx: path[0], parent: Object.freeze(cloneDeep(obj)), cash: currentCash },
            source: { options, ...extra },
            get,
            ...wildcard$2
        });
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
const baseSet = (obj: Record<string, any>, path: PropPaths, value: any, valueMode: SetValueMode, source: Record<string, any>) => {
    const cash = propPathToCash(path);

    // if (cash.at(-1) === 'barWidth') {
    //     console.log('barWidth', { path, value, valueMode, source });
    // }

    if (cash.length === 1) {
        // 直到写入值的时候才 baseValue 进行转换
        const value$ = baseValue(obj, path, value, valueMode, source);
        if (value$ !== '::skip') {
            obj[cash[0]] = value$;
        }
    } else {
        const [head, ...tail] = cash;
        const currentValue = obj[head];

        // 当属性链有下级信息，本级的值非对象时，根据下级罅隙覆盖当前值
        if (!isObject(currentValue)) {
            // 下级属性值类型，新建关联对象
            const childValue = typeof tryNumber(tail[0]) === 'number' ? [] : {};
            obj[head] = childValue;
        }

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
const mset = (obj: Record<string, any>, path: PropPaths, value: SetValue, valueMode: SetValueMode = 'normal') => {
    const cash = propPathToCash(path);
    const options = Object.freeze(cloneDeep(obj));
    const source = { options, path, cash, currentCash: [] };
    if (includes(cash, ['*', '**'])) {
        const data = mget(obj, cash, 'detail');
        return each(upArray(data), (item, inx) => {
            const { cash: currentCash } = item;
            // 模糊匹配只修改匹配到的值
            if (isNil(value) && includes(currentCash, ['**'])) return void 0;
            source.cash = cash;
            source.currentCash = currentCash;
            baseSet(obj, currentCash, value, valueMode, source);
        });
    }

    return baseSet(obj, cash, value, valueMode, source);
};

export default mset;
