import upArray from './up-array.js';
export default function includes(arr, compare, fromIndex = 0) {
    let result = false;
    for (const item of upArray(compare)) {
        if (arr.includes(item, fromIndex)) {
            result = true;
            break;
        }
    }
    return result;
}
