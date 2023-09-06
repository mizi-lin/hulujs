import each from './each.js';
import { set } from 'lodash-es';
function stack(tileObj) {
    const result = {};
    each(tileObj, (value, key) => {
        set(result, key, value);
    });
    return result;
}
export default stack;
