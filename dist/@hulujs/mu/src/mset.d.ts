import { PropPaths } from './mget.js';
/**
 * mset
 * 将 value 按属性链写入 obj
 * @param obj
 * @param path
 * @param value
 * @returns
 */
declare const mset: (obj: Record<string, any>, path: PropPaths, value: any) => void;
export default mset;
