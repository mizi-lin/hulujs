import isFalsy from '../is-falsy.js';
import isNil from '../is-nil.js';
import types from '../types.js';

export const compactDegreeFuncMap = {
    undefined: (value) => value === void 0,
    null: (value) => value === null,
    nil: isNil,
    withoutZero: (value) => {
        return types(value, 'string', 'number') ? true : isFalsy(value);
    },
    not: (value) => !value,
    falsy: isFalsy
};
