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
export type MapperValue = string | string[] | ((source: any) => any);
export type Mapper = Record<string, MapperValue>;
/**
 * mu.mget
 */
export type PropCash = (string | number)[];
export type PropPaths = string | number | PropCash;
export type MgetType = 'detail' | 'normal';
export type BaseGetResult = {
    value: any;
    cash: string[];
};
/**
 * mu.mset
 */
export interface MSetOptionItem {
    obj: Record<string, any>;
    path: string;
    cash: PropCash;
    value: any;
    oldValue: any;
}
export type MSetOptionGetParags = {
    source: Partial<MSetOptionItem>;
    current: Partial<MSetOptionItem>;
};
export interface MSetOptions {
    runIffe?: boolean;
    source?: Partial<MSetOptionItem>;
    current?: Partial<MSetOptionItem>;
    get?: (params: MSetOptionGetParags) => any;
}
export type SetValue = ((current: any, obj: object) => any) | string | number | boolean | null | undefined | object;
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
export type NumberFormatType = 'normal' | 'decimal' | 'percent' | 'currency';
export type NumberFormatUnit = '%' | '‰' | 'k' | 'm' | 'b' | 'permile' | 'percent' | 'toPercent' | 'none' | `${string}`;
export type NumberFormatMath = 'round' | 'floor' | 'ceil';
export type NumberFormatRule = 'default' | 'thousand' | 'billion' | 'million';
export interface NumberFormatOptions {
    rule: NumberFormatRule;
    thousands: number;
    delimiter: string;
    unit: NumberFormatUnit;
    locale: Record<NumberFormatUnit, string>;
    scaler: number;
    math: 'round' | 'floor' | 'ceil';
    precision: number;
    min: number;
    ltMinText: string;
    showZeroUnit: boolean;
}
