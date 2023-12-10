// /**
//  * 拍平集合体层级，呈扁平化显示
//  */
import { isObject } from 'lodash-es';
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
export const cashToPropPath = (cash, type = 'dot') => {
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
            if (regex.test(item))
                return `[${item}]`;
        }
        return item;
    })
        .join('.');
};
/**
 * 属性链扁平化对象
 */
const tile = (obj, type = 'dot') => {
    const memo = new Map();
    const baseTile = (obj, prev) => {
        Object.getOwnPropertyNames(obj).forEach((key) => {
            const value = obj[key];
            const prev$ = [...prev, key];
            if (isObject(value)) {
                baseTile(value, prev$);
            }
            else {
                memo.set(prev$, value);
            }
        });
    };
    baseTile(obj, []);
    const result = {};
    for (const [key, value] of memo.entries()) {
        result[cashToPropPath(key, type)] = value;
    }
    return result;
};
export default tile;
