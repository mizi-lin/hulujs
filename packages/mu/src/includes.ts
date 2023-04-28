import upArray from './up-array.js';

export default function includes(arr: any[], compare: any | any[], fromIndex: number = 0): boolean {
    let result = false;

    for (const item of upArray(compare)) {
        if (arr.includes(item, fromIndex)) {
            result = true;
            break;
        }
    }

    return result;
}
