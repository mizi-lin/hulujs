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
export type BaseGetResult = {
    value: any;
    cash: string[];
};
/**
 * mu.mset
 */
export type SetValue = ((current: any, obj: object) => any) | string | number | boolean | null | undefined | object;
export type SetValueMode = 'normal' | 'nest';
/**
 * mu.msetx
 */
export type KvEntries = [string, SetValue][];
export type KvParis = Record<string, SetValue> | Record<string, SetValue>[] | [string, SetValue] | [string, SetValue][];
/**
 * mu.format
 */
export type NumberCount = number;
export type NumberUnit = '%' | '‰' | 'k' | 'm' | 'b' | 'permile' | 'percent' | 'none' | string;
export type NumberRule = 'billion' | 'million' | 'thousand' | 'none';
export type NumberMath = 'round' | 'floor' | 'ceil';
export type NumberAlias = `${NumberMath}` | `${NumberMath}:${NumberCount}` | `${NumberMath}:${NumberUnit}:${NumberCount}` | `:${NumberCount}` | `:${NumberUnit}:${NumberCount}` | `::${NumberCount}` | `:${NumberCount}:` | `${NumberMath}::${NumberCount}` | `${NumberMath}::` | `${NumberMath}:` | `::`;
export interface NumberFormatOptions {
    rule?: NumberRule;
    thousands?: number;
    delimiter?: string;
    unit?: NumberUnit;
    locale: Record<NumberUnit, string>;
    scaler?: number;
    math?: 'round' | 'floor' | 'ceil';
    count?: number;
    len?: number;
    minPercentValue?: number;
}
