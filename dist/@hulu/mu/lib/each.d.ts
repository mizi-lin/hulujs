export interface ToMapResult {
    '::key': any;
    '::value': any;
}
export type IterateeResult = void | false | ToMapResult;
export type Iteratee = (value: any, key: number | string, src: Record<string | symbol, any>[]) => IterateeResult;
export type MapIteratee = (value: any, key: number | string, src: Record<string | symbol, any>[]) => IterateeResult | any;
export type IterateeCollection = number | string | Record<string | symbol, any> | Record<string | symbol, any>[] | Set<any> | Map<any, any>;
declare function each(items: IterateeCollection, iteratee: Iteratee): void;
export default each;
