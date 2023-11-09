/**
 * 看上去像假的那么它就是假的
 * @param value
 * @param force 当force == true时，长空数组'    ', 全假值数组['', void 0, 0, false], 全假值对象 {a: false, b: null,  c: 0} 也为
 * @mark 为了区别isEmpty, 所以在mu上的isEmpty改名为isFalsy
 * @returns
 */
export default function isFalsy(value: any, force?: boolean): boolean;
