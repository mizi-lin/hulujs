/**
 * 拍平集合体层级，呈扁平化显示
 */
import each from './each.js';
import isBaseType from './is-base-type.js';
import isFalsy from './is-falsy.js';
import map from './map.js';
import types from './types.js';
function isLikeNum(value) {
    return (+value).toString() === value.toString();
}
function handleChain(obj) {
    const propPath = (key, context) => {
        /**
         * 当一个key看起来像数字
         * 且它是一个对象的key，
         */
        if (isLikeNum(key) && types(context, 'object')) {
            return `{{${key}}}`;
        }
        if (!isNaN(Number(key)) && types(context, 'array')) {
            return `[${key}]`;
        }
        return key;
    };
    const rst = {};
    each(obj, (item, key, context) => {
        const k = propPath(key, context);
        if (isBaseType(item)) {
            rst[k] = item;
        }
        else {
            each(tile(item), (subItem, subKey, subContext) => {
                const kk = propPath(subKey, subContext);
                rst[`${k}.${kk}`] = subItem;
            });
        }
    });
    return rst;
}
function handleSpecial(obj) {
    const _path = (key, context) => {
        // 处理子元素为对象，且对象key like number 的情况
        if (isLikeNum(key) && types(context, 'object')) {
            return `{{${key}}}`;
        }
        if (!isNaN(Number(key)) && types(context, 'array')) {
            return `<<<<<<${key}>>>>>>`;
        }
        // 支持key中有特殊字符".[]"的情况
        // { 'a.b': 2, 'a[0]': 33 } 这种的特殊情况
        // 使用临时key替换特殊情况，避免多次处理造成错误
        if (/[.\[\]]/.test(key)) {
            return `______${key}______`;
        }
        return key;
    };
    if (typeof obj !== 'object') {
        return obj;
    }
    const rst = {};
    each(obj, (item, key, context) => {
        const k = _path(key, context);
        if (isBaseType(item) || isFalsy(item)) {
            rst[k] = item;
        }
        else {
            each(handleSpecial(item), (subItem, subKey, subContext) => {
                const kk = _path(subKey, subContext);
                rst[`${k}::::::${kk}`] = subItem;
            });
        }
    });
    return rst;
}
/**
 * mu.tile
 * 将一个对象平铺展开,
 * 因性能问题，不提倡在大对象中平铺处理
 * @param obj
 * @param chainMode: chain模式下，tile后不能被stack还原原来的值
 * @default true, 先实现ChainMode模式，反人类设置，就这样吧
 *
 *
 * mu.tile({ a: { b: 'c', e: 'e3' } })
 * // => { 'a.b': 'c', 'a.e': 'e3' }
 *
 * mu.tile([1])
 * // => { '[0]': 1 }
 *
 * mu.tile({ 'a.a': { b: 'c', 'e[sss]': 'e3' } })
 * // => { '["["a.a"].b"]': 'c', '["["a.a"].["e[sss]"]"]': 'e3' }
 *
 * mu.tile({ 'a.a': { b: 'c', 'e[sss]': 'e3' } }, false)
 * // => { '["["a.a"].b"]': 'c', '["["a.a"].["e[sss]"]"]': 'e3' }
 *
 * mu.tile({ 'a.a': { b: 'c', 'e[sss]': 'e3' } }, true)
 * // => { 'a.a.b': 'c', 'e[sss]': 'e3 }
 */
function tile(obj, chainMode = true) {
    if (typeof obj !== 'object') {
        return obj;
    }
    // chain 模式
    if (chainMode) {
        return handleChain(obj);
    }
    // 普通模式，支持特殊字符
    return map(handleSpecial(obj), (value, key) => {
        const keyParts = key.split('::::::').map((part) => {
            return part
                .replace(/_{6,}/g, '______')
                .replace(/^_{6}(.*?)_{6}$/, '["$1"]')
                .replace(/_{6}/, '')
                .replace(/^<{6}(.+?)>{6}$/, '[$1]');
        });
        return {
            '::key': keyParts.join('.'),
            '::value': value
        };
    });
}
export default tile;
