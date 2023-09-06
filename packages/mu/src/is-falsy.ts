import { isEmpty } from 'lodash-es';
import types from './types.js';

/**
 * 看上去像假的那么它就是假的
 * @param value
 * @param force
 * @mark 为了区别isEmpty, 所以在mu上的isEmpty改名为isFalsy
 * @returns
 */
export default function isFalsy(value: any, force?: boolean) {
    if (force) {
        switch (types(value)) {
            case 'string':
                return isFalsy(value.trim());
            case 'array':
                return isFalsy(value.filter((item) => !isFalsy(item, true)));
            case 'object':
                return isFalsy(Object.values(value).filter((item) => !isFalsy(item, true)));
            default:
                return isFalsy(value);
        }
    }

    switch (types(value)) {
        case 'number':
            return !value;
        case 'boolean':
            return !value;
        case 'regexp':
            return false;
        default:
            return isEmpty(value);
    }
}
