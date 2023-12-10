export type DataRow = Record<string, any>;
/**
 * mu.mapping
 */
export type MappingType = 'mapping' | 'replace' | 'increment';
export type MapperValue = string | ((source: any) => any);
export type Mapper = Record<string, MapperValue>;
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
