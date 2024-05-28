import { NumberFormatOptions, NumberFormatRule, NumberFormatType, Params } from '@hulujs/types';
export declare function format(value: string, format: Params, nullInstead: string): string;
export declare function format(number: number, format: string): string;
export declare function format(value: number, options?: Partial<NumberFormatOptions>): any;
export declare function format(value: number, type: NumberFormatType, options?: Partial<NumberFormatOptions>): any;
export declare function format(value: number, rule: NumberFormatRule, options?: Partial<NumberFormatOptions>): any;
