// /**
//  * 拍平集合体层级，呈扁平化显示
//  */

import { isObject } from 'lodash-es';

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

/**
 * cash to PropPath
 */
export const cashToPropPath = (cash: (string | number)[], type: PropPathType = 'dot') => {
    if (type === 'bracket') {
        return `[${cash.join('][')}]`;
    }

    return cash
        .map((item) => {
            if (typeof item === 'string') {
                const str = Object.values(PROPPATH_SIGN)
                    .map(([value]) => value)
                    .join('\\');
                const regex = new RegExp(`[${str}]`, 'g');
                if (regex.test(item)) return `[${item}]`;
            }
            return item;
        })
        .join('.');
};

/**
 * 属性链扁平化对象
 */
const tile = (obj: Record<string, any>, type: PropPathType = 'dot') => {
    const memo = new Map();
    const baseTile = (obj: Record<string, any>, prev: string[]) => {
        Object.getOwnPropertyNames(obj).forEach((key) => {
            const value = obj[key];
            const prev$ = [...prev, key];
            if (isObject(value)) {
                baseTile(value, prev$);
            } else {
                memo.set(prev$, value);
            }
        });
    };

    baseTile(obj, []);

    const result: Record<string, any> = {};
    for (const [key, value] of memo.entries()) {
        result[cashToPropPath(key as any, type)] = value;
    }
    return result;
};

export default tile;
