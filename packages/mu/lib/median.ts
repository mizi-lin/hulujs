/**
 * 获取数组的中位数
 */

import { PropCash } from '@hulujs/types';
import { MapIteratee } from './each.js';
import map from './map.js';
import mgetx from './mgetx.js';

function baseMedian(arr: number[]) {
    // 对数组进行排序
    const sortedArr = arr.sort((a, b) => a - b);

    // 获取数组的中间索引
    const middleIndex = Math.floor(sortedArr.length / 2);

    // 判断数组长度是奇数还是偶数，返回中位数
    return sortedArr.length % 2 === 1 ? sortedArr[middleIndex] : (sortedArr[middleIndex - 1] + sortedArr[middleIndex]) / 2;
}

function median(arr: number[]);
function median(arr: number[], propPaths: PropCash);
function median(arr: number[], iteratee: MapIteratee);
function median(...args) {
    let arr$!: number[];
    switch (true) {
        case args.length === 1:
            arr$ = args[0];
            break;
        case typeof args[1] === 'function':
            arr$ = map(args[0], args[1], []);
            break;
        default:
            arr$ = mgetx(args[0], args[1]).flat(Infinity);
    }

    return baseMedian(arr$);
}

export default median;
