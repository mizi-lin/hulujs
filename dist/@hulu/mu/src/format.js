import { isNil } from 'lodash-es';
import ifnvl from './if-nvl.js';
function stringfix(keyStr, obj, source, nullInstead) {
    if (keyStr) {
        let prefix;
        let key;
        let suffix;
        const keys = keyStr.split(':');
        if (keys.length > 1) {
            [prefix, key, suffix] = keys;
        }
        else {
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
const stringFormat = (str, format, nullInstead = '') => {
    try {
        return str
            .replace(/\{{2,}/g, '【【')
            .replace(/\}{2,}/g, '】】')
            .replace(/\{([^{}]*?)\}/g, function (m, i) {
            return stringfix(i, format, m, nullInstead);
        })
            .replace(/【【/g, '{')
            .replace(/】】/g, '}');
    }
    catch (error) {
        throw new Error('Type is error,please input a string type');
    }
};
const numberFormat = (str, format) => {
    return '';
};
function format(value, format, nullInstead) {
    if (typeof value === 'string') {
        return stringFormat(value, format, nullInstead);
    }
    if (typeof value === 'number') {
        return numberFormat(value, format);
    }
    return '';
}
export default format;
