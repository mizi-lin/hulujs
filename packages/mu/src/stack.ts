import { MSetOptions } from '@hulujs/types';
import each from './each.js';
import { baseSet } from './mset.js';

/**
 * 堆叠属性链对象为对象
 * @param tileObj
 * @returns
 */
export function baseStack(tileObj: Record<string, any>, config?: MSetOptions) {
    const result = {};
    // const prefix = `@@@@@@@`;
    // each(tileObj, (value, key) => {
    //     const key$ = `${prefix}.${key}`;
    //     mset(result, key$, value);
    // });
    // return result[prefix];
    each(tileObj, (value, key) => {
        baseSet(result, key, value, config);
    });
    return result;
}

const stack = (tileObj: Record<string, any>) => {
    return baseStack(tileObj);
};

export default stack;
