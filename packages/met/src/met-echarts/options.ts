import { compact, isFalsy, msetx, upArray } from '@hulujs/mu';
import { transformData } from './data-transform.js';
import { transformSetting } from './setting.js';
import { transformSubtype } from './subtype.js';
import { defaultOptions } from './constants.js';
import { EChartsOption } from 'echarts';
import { cloneDeep } from 'lodash-es';

/**
 * 将开发者传入的options转换成MetEcharts标准的options格式
 * @param options
 */
const standardizeOptions = (options: EChartsOption) => {
    if (isFalsy(options)) return {};
    const { xAxis, yAxis, series = [] } = options;
    options.xAxis = upArray(xAxis);
    options.yAxis = upArray(yAxis);
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
 * 计算echart最终的配置信息
 * - 权重 setting > data > options
 * - options 默认从 chartTypes 中读取
 */
export const getOptions = ({ data, type, subtypes, mappers, dimension, setting, options }) => {
    // standardize(options)
    const typeOptions = defaultOptions[type] ?? {};
    const options$ = standardizeOptions(cloneDeep(options) ?? {});
    const baseOptions = cloneDeep({ ...typeOptions, ...options$ });

    // 处理data数据
    const dataKvParis = transformData({ data, type, mappers, dimension });
    msetx(baseOptions, dataKvParis);

    // 处理chartTypes配置
    const subtypeKvParis = transformSubtype(type, subtypes, baseOptions);
    msetx(baseOptions, subtypeKvParis);

    // 处理setting配置
    const settingKvParis = transformSetting(type, setting, baseOptions);
    msetx(baseOptions, settingKvParis);

    // 清理undefined/null属性值
    // 支持写入undefined/null的属性，表示清理已配置的值，恢复默认值
    return compact(baseOptions, 'nil');
};
