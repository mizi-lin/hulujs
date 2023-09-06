/**
 * 类型判断
 */

export type LangType =
    | 'array'
    | 'bigint'
    | 'boolean'
    | 'date'
    | 'function'
    | 'number'
    | 'null'
    | 'object'
    | 'regexp'
    | 'string'
    | 'symbol'
    | 'undefined';

export type Collection = Record<string | symbol, any> | Record<string | symbol, any>[];
export type Row = Record<string, any>;

function types(value: any): LangType;
function types(value: any, ...types: LangType[]): boolean;
function types(...args: any) {
    const [value, ...types$] = args;

    if (types$.length) {
        return types$.includes(types(value));
    }

    if (typeof value === 'string') return 'string';
    if (typeof value === 'function') return 'function';
    if (value === void 0) return 'undefined';
    if (value === null) return 'null';
    if (value instanceof Map) return 'map';
    if (value instanceof Set) return 'set';
    if (value instanceof RegExp) return 'regexp';
    const propCallType = Object.prototype.toString.call(Object(value));
    // const propCallType = Object.prototype.toString.call(value);
    const result = propCallType
        .replace(/\[object (.*)]/g, '$1')
        .replace(/.*(Element)$/i, '$1')
        .toLowerCase();
    return result as LangType;
}

export default types;
