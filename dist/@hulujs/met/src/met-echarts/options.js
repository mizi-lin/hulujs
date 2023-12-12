import { msetx } from '@hulujs/mu';
import { transformData } from './data-transform.js';
import { transformSetting } from './setting.js';
import { transformSubtype } from './subtype.js';
/**
 * 计算echart最终的配置信息
 * - 权重 setting > data > options
 * - options 默认从 chartTypes 中读取
 */
export const getOptions = ({ data, type, subtypes, mappers, dataModel, setting, options }) => {
    // @todo standardize(options)
    const baseOptions = { ...options };
    // 处理data数据
    const dataKvParis = transformData({ data, type, mappers, dataModel });
    msetx(baseOptions, dataKvParis);
    // 处理chartTypes配置
    const subtypeKvParis = transformSubtype(type, subtypes, baseOptions);
    msetx(baseOptions, subtypeKvParis);
    // 处理setting配置
    const settingKvParis = transformSetting(type, setting, baseOptions);
    msetx(baseOptions, settingKvParis);
    return baseOptions;
};
