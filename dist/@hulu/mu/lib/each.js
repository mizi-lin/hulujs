/**
 * 支持集合Collection遍历
 */
import { isMap, isSet } from 'lodash-es';
import types from './types.js';
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
function forOwner(items, iteratee) {
    for (const prop in items) {
        if (items.hasOwnProperty(prop)) {
            iteratee(items[prop], prop, items);
        }
    }
}
function each(items, iteratee) {
    if (Array.isArray(items))
        return items.forEach(iteratee);
    if (types(items, 'object'))
        return forOwner(items, iteratee);
    // @ts-ignore
    if (isMap(items))
        return items.forEach(iteratee);
    let arr;
    if (typeof items === 'string')
        arr = items.split('');
    if (typeof items === 'number')
        arr = new Array(Math.ceil(items)).map((value, inx) => inx);
    if (isSet(items))
        arr = [...items.keys()];
    forOwner(arr, iteratee);
}
export default each;
