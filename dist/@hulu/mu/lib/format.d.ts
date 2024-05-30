import { NumberFormatOptions, NumberFormatRule, NumberFormatType, Params } from '@hulujs/types';
declare function format(value: string, format?: Params, nullInstead?: string): string;
declare function format(number: number, format: string): string;
declare function format(value: number, options?: Partial<NumberFormatOptions>): any;
declare function format(value: number, precision: number, options?: Partial<NumberFormatOptions>): any;
declare function format(value: number, type: NumberFormatType, options?: Partial<NumberFormatOptions>): any;
declare function format(value: number, rule: NumberFormatRule, options?: Partial<NumberFormatOptions>): any;
export default format;
