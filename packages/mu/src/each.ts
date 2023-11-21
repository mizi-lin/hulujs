/**
 * 支持集合Collection遍历
 */
import { forOwn, isMap, isSet } from 'lodash-es';
import types from './types.js';

export interface ToMapResult {
    '::key': any;
    '::value': any;
}
export type IterateeResult = void | false | ToMapResult;
// export type Iteratee = (value: unknown, key: unknown, src: unknown) => IterateeResult;
export type Iteratee = (
    value: any,
    key: number | string,
    src: Record<string | symbol, any>[]
) => IterateeResult;

export type MapIteratee = (
    value: any,
    key: number | string,
    src: Record<string | symbol, any>[]
) => IterateeResult | any;

export type IterateeCollection =
    | number
    | string
    | Record<string | symbol, any>
    | Record<string | symbol, any>[]
    | Set<any>
    | Map<any, any>;

// function each(
//     arr: Record<string | symbol, any>[],
//     iteratee: (value: any, key: number, src: Record<string | symbol, any>[]) => IterateeResult
// );

// function each(
//     obj: Record<string | symbol, any>,
//     iteratee: (
//         value: any,
//         key: string | symbol,
//         src: Record<string | symbol, any>
//     ) => IterateeResult
// );

// function each(str: string, iteratee: (value: string, key: number, src: string) => IterateeResult);

// function each(
//     number: number,
//     iteratee: (value: string, key: number, src: string) => IterateeResult
// );

// function each(
//     sets: Set<any>,
//     iteratee: (value: string, key: unknown, src: string) => IterateeResult
// );

// function each(
//     mapset: Map<any, any>,
//     iteratee: (value: string, key: unknown, src: string) => IterateeResult
// );

function forOwner(items, iteratee: Iteratee) {
    for (const prop in items) {
        if (items.hasOwnProperty(prop)) {
            iteratee(items[prop], prop, items);
        }
    }
}

function each(items: IterateeCollection, iteratee: Iteratee) {
    if (Array.isArray(items)) return items.forEach(iteratee);
    if (types(items, 'object')) return forOwner(items, iteratee);
    // @ts-ignore
    if (isMap(items)) return (items as Map<any, any>).forEach(iteratee);

    let arr!: any[];
    if (typeof items === 'string') arr = items.split('');
    if (typeof items === 'number') arr = new Array(Math.ceil(items)).map((value, inx) => inx);
    if (isSet(items)) arr = [...(items as Set<any>).keys()];
    forOwner(arr, iteratee);
}

export default each;
