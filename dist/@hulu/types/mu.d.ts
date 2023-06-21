export type NumberCount = number;
export type NumberUnit = '%' | '‰' | 'k' | 'm' | 'b' | 'permile' | 'percent' | 'none' | string;
export type NumberRule = 'billion' | 'million' | 'thousand' | 'none';
export type NumberMath = 'round' | 'floor' | 'ceil';
export type NumberAlias = `${NumberMath}` | `${NumberMath}:${NumberCount}` | `${NumberMath}:${NumberUnit}:${NumberCount}` | `:${NumberCount}` | `:${NumberUnit}:${NumberCount}` | `::${NumberCount}` | `:${NumberCount}:` | `${NumberMath}::${NumberCount}` | `${NumberMath}::` | `${NumberMath}:` | `::`;
export declare interface NumberFormatOptions {
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
