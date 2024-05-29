import { NumberFormatOptions, NumberFormatRule, NumberFormatType, Params } from '@hulujs/types';
import ifnvl from './if-nvl.js';
import isNil from './is-nil.js';
import { stringFormat } from './utils/string-format.js';
import { numberFormat } from './utils/number-format.js';

function format(value: string, format?: Params, nullInstead?: string): string;
function format(number: number, format: string): string;
function format(value: number, options?: Partial<NumberFormatOptions>);
function format(value: number, precision: number, options?: Partial<NumberFormatOptions>);
function format(value: number, type: NumberFormatType, options?: Partial<NumberFormatOptions>);
function format(value: number, rule: NumberFormatRule, options?: Partial<NumberFormatOptions>);
function format(...args: any[]) {
    const [value, ...extra] = args;
    if (isNil(value)) return value;

    if (typeof value === 'string') {
        // @ts-ignore
        return stringFormat(value, ...extra);
    }

    if (typeof value === 'number') {
        return numberFormat(value, ...extra);
    }

    return '';
}

export default format;
