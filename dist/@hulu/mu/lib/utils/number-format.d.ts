import { NumberFormatOptions, NumberFormatRule, NumberFormatType } from '@hulujs/types';
declare function numberFormat(value: number, options?: Partial<NumberFormatOptions>): any;
declare function numberFormat(value: number, precision?: number, options?: Partial<NumberFormatOptions>): any;
declare function numberFormat(value: number, type: NumberFormatType, options?: Partial<NumberFormatOptions>): any;
declare function numberFormat(value: number, rule: NumberFormatRule, options?: Partial<NumberFormatOptions>): any;
export { numberFormat };
