import { cloneDeep, curry, isNil, isObject } from 'lodash-es';
import each from './each.js';
import includes from './includes.js';
import mget, { propCashToPath, propPathToCash } from './mget.js';
import upArray from './up-array.js';
import { SetValue, PropCash, MSetOptionItem, MSetOptions, PropPaths } from '@hulujs/types';
import tryNumber from './try-number.js';

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
 * @param cash
 * @param value
 * @returns
 */
const baseSetPathValue = (obj: Record<string, any>, cash: PropCash, value: any, config: MSetOptions) => {
    // console.log('baseValue', obj, path, value,  source);

    const { runIffe = true } = config;

    if (runIffe && typeof value === 'function' && value.iife) {
        // console.trace(config);
        const func = value;
        const { source = {} } = config;
        const oldValue = mget(obj, cash);
        const get = curry(mget)(source.obj ?? {});
        const obj$ = Object.freeze(cloneDeep(obj));
        const path$ = propCashToPath(cash);
        const current: MSetOptionItem = { obj: obj$, cash, path: path$, value, oldValue: oldValue };

        // const wildcard$1 = map(config.cash, (value, inx) => {
        //     if (value === '*' || value === '**') {
        //         const wildcardCash = (currentCash as string[]).slice(0, +inx + 1);
        //         return get(wildcardCash);
        //     }
        //     return '::break';
        // });
        // const wildcard$2 = map(wildcard$1, (value, inx) => ({ '::key': `$${inx}`, '::value': value }), {});

        const result = func({ source, current, get });

        return result;
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
const setPathValue = (obj: Record<string, any>, path: PropCash, value: any, config: MSetOptions) => {
    const cash = propPathToCash(path);

    // if (cash.at(-1) === 'barWidth') {
    //     console.log('barWidth', { path, value,  source });
    // }

    if (cash.length === 1) {
        // 直到写入值的时候才 baseValue 进行转换
        const value$ = baseSetPathValue(obj, path, value, config);
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

        setPathValue(obj[head], tail, value, config);
    }
};

export const baseSet = (obj: Record<string, any>, path: PropPaths, value: SetValue, config?: MSetOptions) => {
    const cash = propPathToCash(path);
    const path$ = propCashToPath(cash);
    const obj$ = Object.freeze(cloneDeep(obj));
    const oldValue = mget(obj$, cash);
    const source: MSetOptionItem = { obj: obj$, path: path$, cash, value, oldValue, ...config?.source };

    if (includes(cash, ['*', '**'])) {
        const data = mget(obj, cash, 'detail');
        return each(upArray(data), (item, inx) => {
            const { cash } = item;
            // 模糊匹配只修改匹配到的值
            if (isNil(value) && includes(cash, ['**'])) return void 0;
            setPathValue(obj, cash, value, { ...config, source });
        });
    }

    return setPathValue(obj, cash, value, { ...config, source });
};

/**
 * mset
 * 将 value 按属性链写入 obj
 * @param obj
 * @param path
 * @param value
 * @param runIffe
 * @returns
 */
const mset = (obj: Record<string, any>, path: PropPaths, value: SetValue, config?: MSetOptions) => {
    return baseSet(obj, path, value, config);
};

export default mset;
