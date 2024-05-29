import isNil from './is-nil.js';
import { stringFormat } from './utils/string-format.js';
import { numberFormat } from './utils/number-format.js';
function format(...args) {
    const [value, ...extra] = args;
    if (isNil(value))
        return value;
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
