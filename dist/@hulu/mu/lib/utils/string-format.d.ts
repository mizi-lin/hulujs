import { Params } from '@hulujs/types';
/**
 *
 * @param str
 * @param format
 * @param nullInstead
 * @returns
 *
 * stringFormat('这是一个{adj}的方法', { adj: '神奇' });
 * // 这是一个神奇的方法
 */
export declare const stringFormat: (str: string, format?: Params, nullInstead?: string) => string;
