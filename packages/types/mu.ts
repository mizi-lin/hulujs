export type DataRow = Record<string, any>;

/**
 * mu.mapping
 */
export type MappingType = 'mapping' | 'replace' | 'increment';
export type MapperValue = string | ((source: any) => any);
export type Mapper = Record<string, MapperValue>;

/**
 * mu.mget
 */
export type PropPaths = string | number | (string | number)[];
export type MgetType = 'detail' | 'normal';
export type BaseGetResult = { value: any; cash: string[] };

/**
 * mu.mset
 */
export type SetValue = ((current: any, obj: object) => any) | string | number | boolean | null | undefined | object;
export type SetValueMode = 'normal' | 'nest';

/**
 * mu.msetx
 */

// 键值对的最终形式，用于mset的值设计
export type KvEntries = [string, SetValue][];
// 键值对的可能存在的形式，需转换为kvEntries进行计算
export type KvParis = Record<string, SetValue> | Record<string, SetValue>[] | [string, SetValue] | [string, SetValue][];

/**
 * mu.format
 */
export type NumberCount = number;
export type NumberUnit = '%' | '‰' | 'k' | 'm' | 'b' | 'permile' | 'percent' | 'none' | string;
export type NumberRule = 'billion' | 'million' | 'thousand' | 'none';
export type NumberMath = 'round' | 'floor' | 'ceil';

export type NumberAlias =
    | `${NumberMath}`
    | `${NumberMath}:${NumberCount}`
    | `${NumberMath}:${NumberUnit}:${NumberCount}`
    | `:${NumberCount}`
    | `:${NumberUnit}:${NumberCount}`
    | `::${NumberCount}`
    | `:${NumberCount}:`
    | `${NumberMath}::${NumberCount}`
    | `${NumberMath}::`
    | `${NumberMath}:`
    | `::`;

export interface NumberFormatOptions {
    // 执行规则， 默认为 million
    rule?: NumberRule;

    // 千分位，默认值为 => 3
    // 根据千分位规则, 可配置分割位数，匹配 delimiter 显示
    thousands?: number;

    // 千分位分隔符，默认为 => ','
    delimiter?: string;

    // 单位
    unit?: NumberUnit;

    // locale 国际化配置
    locale: Record<NumberUnit, string>;

    // 每个数学单位匹配的换算值
    scaler?: number;

    // 数学方法, 默认 => 'round' 四舍五入
    math?: 'round' | 'floor' | 'ceil';

    // 保留小数位数, 如果为负数，为强制保留小数位数(即保留末尾的0)
    count?: number;

    // 保留整数位数，不足前置补0，小数舍去
    // leng 不与其他通存
    len?: number;

    // 百分比最小值配置，用于配置极小值的配置
    minPercentValue?: number;
}
