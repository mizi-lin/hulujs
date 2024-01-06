import { RegKey, Regc } from '@hulujs/msc';
import { ceil, floor, isPlainObject, multiply, padEnd, round } from 'lodash-es';
import { stringFormat } from './string-format.js';
import compact from '../compact.js';
/***
 * 数字格式化
 */
const typeOptionsMap = {
    toPercent: { unit: 'toPercent' },
    percent: { unit: 'percent' },
    decimal: { unit: 'none' }
};
const ruleOptionsMap = {};
const unitMap = {
    '': [1, ''],
    none: [1, ''],
    percent: [100, '%'],
    toPercent: [1, '%'],
    '%': [100, '%'],
    permile: [1000, '‰'],
    '‰': [1000, '‰'],
    k: [1 / 1000, 'k'],
    m: [1 / (1000 * 1000), 'm'],
    b: [1 / (1000 * 1000 * 1000), 'b']
};
const precisionMap = { ceil, floor, round };
// 重载函数参数计算
function reargs(args) {
    const [value, ...extra] = args;
    const options = isPlainObject(extra[0]) ? extra[0] : isPlainObject(extra[1]) ? extra[1] : {};
    const rule = typeof extra[0] === 'string' && ['default', 'thousand', 'billion', 'million'].includes(extra[0]) ? extra[0] : 'default';
    const type = typeof extra[0] === 'string' && ['normal', 'decimal', 'percent', 'toPercent', 'currency'].includes(extra[0]) ? extra[0] : 'normal';
    const precision = typeof extra[0] === 'number' ? extra[0] : void 0;
    const value$ = typeof value === 'string' ? parseFloat(value) : value;
    return { value: value$, type, rule, options: compact({ precision, ...options }) };
}
// 千分位处理
function thousands(num, count = 3, delimiter = ',') {
    const reg = new RegExp(`(\\d{1,${count}})(?=(?:\\d{${count}})+$)`, 'g');
    return num.replace(reg, `$1${delimiter}`);
}
function numberFormat(...args) {
    const { value, type, rule, options: customOptions } = reargs(args);
    const defaultOptions = {
        math: 'round',
        rule: 'million',
        precision: 1,
        thousands: 3,
        delimiter: ',',
        unit: 'none',
        min: 0.0005,
        ltMinText: '< {min}',
        showZeroUnit: false
    };
    const globalOptions = Regc.get(RegKey.MU_NUMBER_FORMAT_OPTIONS) ?? {};
    const typeOptions = typeOptionsMap[type];
    const ruleOptions = ruleOptionsMap[rule];
    // 根据权重计算最终的配置参数
    // 用户手动配置大于全局配置，全局配置大于默认配置
    const options = { ...defaultOptions, ...globalOptions, ...typeOptions, ...ruleOptions, ...customOptions };
    // console.log('options->', args, options, customOptions);
    // 单位换算计算
    const [scaler, unit] = unitMap[options.unit] ?? [options.scaler ?? 1, options.unit ?? ''];
    // 按单位计算后的数值
    const value$byUnit = multiply(value, scaler);
    // 最小值显示
    if (value > 0 && value < options.min) {
        const min = numberFormat(options.min, { ...options, min: Number.MIN_VALUE, precision: Number.MAX_VALUE });
        return stringFormat(options.ltMinText, { min, value, minValue: options.min });
    }
    // 数学方法, 精度计算
    const value$precision = precisionMap[options.math](value$byUnit, Math.abs(options.precision));
    // console.log({ value$precision, value$byUnit, precision: Math.abs(options.precision), args });
    // 将数字转为字符串，并取得整数部分与小数部分
    const [int$, decimal$] = value$precision.toString().split('.');
    // 千分位只支持整数部分
    const int$thousands = thousands(int$, options.thousands, options.delimiter);
    // 处理小数部分
    // 当 options.precision < 0 的时候，强制保留小数位数
    const decimal$precision = options.precision < 0 ? padEnd(decimal$ ?? 0, -options.precision, '0') : decimal$;
    const decimal$result = decimal$precision ? `.${decimal$precision}` : '';
    // 兼容显示
    // 当值为 0.0...0 的时候, 最后一位改为1，否则显示值为 `0.000` `0.00000` 有点奇怪
    const decimal$lastest = value !== 0 && /\.0+/.test(decimal$result) ? decimal$result.replace(/0$/, '1') : decimal$result;
    const value$result = `${int$thousands}${decimal$lastest}`;
    // 当最后的值为0的时候，后面不跟单位，否则 `0%, 0k`显示较为奇怪
    const unit$ = options.showZeroUnit ? unit : value$result === '0' ? '' : unit;
    return `${value$result}${unit$}`;
}
export { numberFormat };
// console.log('->', num, '::', '2,388,233.4', '=', format(num));
// console.log('->', num, '::', '238,823,336.7%', '=', format(num, 'percent'));
// console.log('->', num, '::', '238,823,336.74%', '=', format(num, 'percent', { precision: 3 }));
// console.log('->', num, '::', '238,823,336.740%', '=', format(num, 'percent', { precision: -3 }));
// console.log('->', num, '::', '2,388,233.4', '=', format(num, 'decimal'));
// console.log('->', num, '::', '238.8万', '=', format(num, { unit: '万', scaler: 1 / (10 * 1000) }));
// console.log('->', num, '::', '2,388,233.4', '=', format(num));
// console.log('->', num, '::', '2,388,233.3674', '=', format(num, 5));
// console.log('->', num, '::', '2,388,233.36740', '=', format(num, -5));
// console.log('->', num, '::', '2,388,233.37', '=', format(num, -5, { precision: 2 }));
// console.log('->', 0.00001, '::', '< 0.0005', '=', format(0.00001, -5, { precision: 2 }));
// console.log('->', 0.00001, '::', '< 0.05%', '=', format(0.00001, 'percent'));
// console.log('->', 0.00001, '::', '0', '=', format(0.00001, 'percent', { min: minV }));
// console.log('->', 0.00001, '::', '0.001%', '=', format(0.00001, 'percent', { min: minV, precision: maxV }));
// console.log('->', 0.00001, '::', '0', '=', format(0.00001, { min: minV, precision: 2 }));
// console.log('->', 0.00001, '::', '0.01', '=', format(0.00001, { min: minV, precision: -2 }));
// console.log('->', 0, '::', '0.00', '=', format(0, { precision: -2 }));
// console.log('->', 0, '::', '0.00', '=', format(0, -2));
// console.log('->', 0, '::', '0', '=', format(0, 2));
