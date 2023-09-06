import types from './types.js';

const isBaseType = (value: any): boolean => {
    return types(
        value,
        'string',
        'number',
        'boolean',
        'function',
        'regex',
        'symbol',
        'null',
        'undefined'
    );
};

export default isBaseType;
