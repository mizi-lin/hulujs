import each from './each.js';
import { set } from 'lodash-es';
/**
 * 堆叠属性链对象为对象
 * @param tileObj
 * @returns
 */
function stack(tileObj) {
    const result = {};
    const prefix = `@@@@@@@`;
    each(tileObj, (value, key) => {
        const key$ = `${prefix}.${key}`;
        set(result, key$, value);
    });
    return result[prefix];
}
export default stack;
