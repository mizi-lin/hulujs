import { isEmpty as _isEmpty } from 'lodash-es';
import types from './types.js';
export default function isEmpty(value, force) {
    if (force) {
        switch (types(value)) {
            case 'string':
                return _isEmpty(value.trim());
            case 'array':
                return _isEmpty(value.filter((item) => !isEmpty(item, true)));
            case 'object':
                return _isEmpty(Object.values(value).filter((item) => !isEmpty(item, true)));
            default:
                return _isEmpty(value);
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
            return _isEmpty(value);
    }
}
