export type IterateeResult = void | false;
export type Iteratee = ((value: any, key: number, src: Record<string | symbol, any>[]) => IterateeResult) | ((value: any, key: string, src: Record<string | symbol, any>[]) => IterateeResult);
export type IterateeItem = number | string | Record<string | symbol, any> | Record<string | symbol, any>[] | Set<any> | Map<any, any>;
declare function each(items: IterateeItem, iteratee: Iteratee): void;
export default each;
