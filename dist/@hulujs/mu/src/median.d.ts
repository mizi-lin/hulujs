/**
 * 获取数组的中位数
 */
import { PropCash } from '@hulujs/types';
import { MapIteratee } from './each.js';
declare function median(arr: number[]): any;
declare function median(arr: number[], propPaths: PropCash): any;
declare function median(arr: number[], iteratee: MapIteratee): any;
export default median;
