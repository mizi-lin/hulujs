/**
 * mu.types
 */
export type LangType = 'array' | 'bigint' | 'boolean' | 'date' | 'function' | 'number' | 'null' | 'object' | 'regexp' | 'string' | 'symbol' | 'undefined';
export type Row = Record<string, any>;
export type Rows = Row[];
export type DataRow = Record<string, any>;
export type Collection = Row | Row[];
/**
 * mu.compact
 */
export type CompactType = 'none' | 'undefined' | 'null' | 'nil' | 'withoutZero' | 'not' | 'falsy';
/**
 * mu.mapping
 */
export type MappingType = 'mapping' | 'replace' | 'increment' | 'source';
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
export interface SetNestValueParams {
    value: any;
    inx: string | number;
    prev: any;
    path: string;
    cash: string | string[];
    source: Record<string, any> | Record<string, any>[];
    get: (path: PropPaths) => any;
}
/**
 * mu.msetx
 */
export type KvEntries = [string, SetValue][];
export type KvParis = Record<string, SetValue> | [string, SetValue];
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
