import { Params } from '@hulujs/types';
import ifnvl from './if-nvl.js';
import isNil from './is-nil.js';

/**
 * 字符串处理
 * 添加前后缀和替换字符串
 */
function stringfix(keyStr: string, obj: Record<string, any>, source: string, nullInstead?: string) {
    if (keyStr) {
        let prefix;
        let key;
        let suffix;
        const keys = keyStr.split(':');
        if (keys.length > 1) {
            [prefix, key, suffix] = keys;
        } else {
            key = keyStr;
        }

        let value = obj?.[key];

        if (!isNil(nullInstead)) {
            value = ifnvl(value, nullInstead);
        }

        value = `${value}`;

        if (value.trim() === '') {
            return value;
        }

        return [ifnvl(prefix, ''), value, ifnvl(suffix, '')].join('');
    }
    return source;
}

/**
 *
 * @param str
 * @param format
 * @param nullInstead
 * @returns
 *
 * stringFormat('这是一个{adj}的方法', { adj: '神奇' });
 * // 这是一个神奇的方法
 */
const stringFormat = (str: string, format: Params, nullInstead: string = '') => {
    try {
        return str
            .replace(/\{{2,}/g, '【【')
            .replace(/\}{2,}/g, '】】')
            .replace(/\{([^{}]*?)\}/g, function (m, i) {
                return stringfix(i, format, m, nullInstead);
            })
            .replace(/【【/g, '{')
            .replace(/】】/g, '}');
    } catch (error) {
        throw new Error('Type is error,please input a string type');
    }
};

const numberFormat = (str: number, format: Params) => {
    return '';
};

function format(value: string, format: Params, nullInstead?: string): string;
function format(number: string, format: string, nullInstead?: string): string;
function format(value: any, format: any, nullInstead?: string): string {
    if (typeof value === 'string') {
        return stringFormat(value, format, nullInstead);
    }

    if (typeof value === 'number') {
        return numberFormat(value, format);
    }

    return '';
}

export default format;
