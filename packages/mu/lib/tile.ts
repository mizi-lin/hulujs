// /**
//  * 拍平集合体层级，呈扁平化显示
//  */

import { mapKeys } from 'lodash-es';
import { propPathToCash } from './mget.js';

/**
 * PropPathType
 * bracket: 中挂号链式
 * dot: 点式链式
 */
export type PropPathType = 'bracket' | 'dot';

export const PROPPATH_SIGN = {
    // 匹配双引号
    DOUBLE_QUOTES: [`"`, `””`],
    // 匹配单引号
    SINGLE_QUOTES: [`'`, `‘‘`],
    // 匹配中括号
    LEFT_BRACKETS: [`[`, `【【`],
    RIGHT_BRACKETS: [`]`, `】】`],
    // 匹配点
    DOT: [`.`, `。。`],
    // 中划线
    STRIKE: [`-`, `————`]
};

export const canBracketRegex = () => {
    const str = Object.values(PROPPATH_SIGN)
        .map(([value]) => value)
        .join('\\');
    return new RegExp(`[${str}]`, 'g');
};

export const bracketKey = (key: string | number) => {
    if (typeof key === 'number') return key;
    const str = Object.values(PROPPATH_SIGN)
        .map(([value]) => value)
        .join('\\');
    const regex = new RegExp(`[${str}]`, 'g');
    return regex.test(key) ? `[${key}]` : key;
};

/**
 * cash to PropPath
 */
export const cashToPropPath = (cash: (string | number)[], type: PropPathType = 'dot') => {
    if (typeof cash === 'string' || typeof cash === 'number') return cash;
    if (type === 'bracket') return `[${cash.join('][')}]`;
    return cash
        .map((item) => {
            if (typeof item === 'string') {
                return bracketKey(item);
            }
            return item;
        })
        .join('.');
};

/**
 * 平铺对象
 * - 平铺对象的规则限定
 * -- 不平铺 dom
 * -- 不平铺  react component
 * - 针对循环引用的规则限定
 */
export const tile = (obj: Record<string, any>, chainType: PropPathType = 'dot', deep: number = 13) => {
    // 点式调用优先
    const isDot = chainType === 'dot';
    let result: Record<string, any> = {};

    let count = 0;

    // 判断循环引用 CircularReference
    let memory = new WeakMap();

    function recurse(current, props = '') {
        count++;

        // if (count > 300) {
        //     return result;
        // }

        // 如果当前值不是对象，直接返回
        if (Object(current) !== current) {
            result[props] = current;
        } else if (Array.isArray(current)) {
            // 如果是数组，进入遍历递归
            for (let i = 0; i < current.length; i++) {
                recurse(current[i], `${props}[${i}]`);
            }
            if (!current.length) return (result[props] = []);
        } else if (typeof current === 'function') {
            result[props] = current;
        } else {
            // 如果当前是 Element 或 FiberNode，跳过展开
            if (current.nodeType || current.$$typeof) {
                return (result[props] = current);
            }

            // 若层级太深，跳过展开
            if (propPathToCash(props)?.length > deep) {
                return (result[props] = current);
            }

            // 若循环引用，跳过展开
            if (memory.has(current)) {
                return (result[props] = current);
            }

            // 如果是对象，遍历对象
            let isEmpty = true;
            memory.set(current, true);
            for (let key in current) {
                isEmpty = false;
                if (isDot) {
                    // todo 将key的判断为加所有的特殊字符
                    const key$ = /[.\[\]'"-]/.test(key) ? `[${key}]` : key;
                    recurse(current[key], props ? `${props}.${key$}` : key$);
                } else {
                    recurse(current[key], `${props}[${key}]`);
                }
            }

            if (isEmpty) return (result[props] = {});
        }
    }

    recurse(obj);
    memory = null as unknown as WeakMap<any, unknown>;
    return result;
};

export const prefixTile = (prefix: string, obj: Record<string, any>, chainType?: PropPathType, deep?: number) => {
    return mapKeys(tile(obj, chainType, deep), (value, key) => {
        return `${prefix}.[${key}]`;
    });
};

export default tile;
