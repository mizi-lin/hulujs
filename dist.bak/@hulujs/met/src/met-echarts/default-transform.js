import { isFalsy, run, upArray } from '@hulujs/mu';
import { defaultOptions } from './constants.js';
import { cloneDeep } from 'lodash-es';
/**
 * 将开发者传入的options转换成MetEcharts标准的options格式
 * @param options
 */
const standardizeOptions = (options) => {
    if (isFalsy(options))
        return {};
    const { xAxis, yAxis, series = [] } = options;
    run(xAxis, () => {
        options.xAxis = upArray(xAxis);
    });
    run(yAxis, () => {
        options.yAxis = upArray(yAxis);
    });
    options.series = upArray(series).map((item) => {
        const { data = [] } = item;
        item.data = data.map((item) => {
            return typeof item === 'object' ? item : { value: item };
        });
        return item;
    });
    return options;
};
/**
 * 默认数据处理
 */
export const defaultTransform = ({ type, options }) => {
    // 获取默认值
    const defs = defaultOptions[type] ?? {};
    // extends 处理
    const defs$extends = defaultOptions[defs?.extends] ?? {};
    // 继承数据
    const defsOptions = { ...defs, ...defs$extends, extends: void 0 };
    // 标准化配置
    const options$ = standardizeOptions(cloneDeep(options) ?? {});
    // 基本配置
    const baseOptions = { ...defsOptions, ...options$ };
    // 配置规则
    const rules = Object.entries(baseOptions).reduce((temp, [key, value]) => {
        if (/[.\[]/g.test(key)) {
            temp[key] = value;
            baseOptions[key] = void 0;
        }
        return temp;
    }, {});
    return { baseOptions, rules };
};
