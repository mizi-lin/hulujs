import { baseCompact, msetx, tile } from '@hulujs/mu';
import { transformData } from './data-transform.js';
import { transformSetting } from './setting.js';
import { transformSubtype } from './subtype.js';
import { baseStack } from '@hulujs/mu';
import { defaultTransform } from './default-transform.js';
/**
 * 计算echart最终的配置信息
 * - 权重 setting > data > options
 * - options 默认从 chartTypes 中读取
 */
export const getOptions = ({ data, type, subtypes, mappers, dimension, setting, options, fill }) => {
    // standardize(options)
    const { baseOptions, rules } = defaultTransform({ type, options });
    // 处理data数据
    const dataKvParis = transformData({ data, type, mappers, dimension, fill });
    // 写入处理好的dataKvParis
    msetx(baseOptions, dataKvParis, { runIffe: false });
    // 写入规则配置
    msetx(baseOptions, rules, { runIffe: false });
    // 处理chartTypes配置
    const subtypeKvParis = transformSubtype(type, subtypes, baseOptions);
    msetx(baseOptions, subtypeKvParis, { runIffe: false });
    // 处理setting配置
    const settingKvParis = transformSetting(type, setting, baseOptions);
    msetx(baseOptions, settingKvParis, { runIffe: false });
    const obj = Object.freeze(baseOptions);
    const tileObj = tile(baseOptions);
    // 清理undefined/null属性值
    // 支持写入undefined/null的属性，表示清理已配置的值，恢复默认值
    // return compact(tileObj, 'nil');
    const tileObj$ = baseCompact(tileObj, { runIffe: false });
    return baseStack(tileObj$, { runIffe: true, source: { obj } });
};
