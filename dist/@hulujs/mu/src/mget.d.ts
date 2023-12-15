import { PropPaths, MgetType } from '@hulujs/types';
/**
 * 将普通路径转为数组
 * 每个数据项为路径中的某一个节点
 */
export declare const propPathToCash: (path: PropPaths, type?: 'bracket' | 'all') => (string | number)[];
/**
 * 通配符支持
 * - '*' 当前层级
 * - '**' 后代匹配值
 * @param obj
 * @param path
 * @param type: 'normal' | 'detail'
 * @returns
 */
declare const mget: (obj: Record<string, any>, path: PropPaths, type?: MgetType) => any;
export default mget;
