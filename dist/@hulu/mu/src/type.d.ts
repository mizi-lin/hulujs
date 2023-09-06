/**
 * 类型判断
 */
type LangType = 'array' | 'bigint' | 'boolean' | 'date' | 'function' | 'number' | 'null' | 'object' | 'regex' | 'string' | 'symbol' | 'undefined';
export type Collection = Record<string | symbol, any> | Record<string | symbol, any>[];
export type Row = Record<string, any>;
declare function types(value: any): LangType;
declare function types(value: any, ...types: LangType[]): boolean;
export default types;
