import isNil from './is-nil.js';
import { stringFormat } from './utils/string-format.js';
import { numberFormat } from './utils/number-format.js';
export function format(...args) {
    const [value] = args;
    if (isNil(value))
        return value;
    if (typeof value === 'string') {
        return stringFormat(value, ...args);
    }
    if (typeof value === 'number') {
        return numberFormat(value, ...args);
    }
    return '';
}
