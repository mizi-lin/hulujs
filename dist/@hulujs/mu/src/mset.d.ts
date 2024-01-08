import { SetValue, MSetOptions, PropPaths } from '@hulujs/types';
export declare const baseSet: (obj: Record<string, any>, path: PropPaths, value: SetValue, config?: MSetOptions) => void;
/**
 * mset
 * 将 value 按属性链写入 obj
 * @param obj
 * @param path
 * @param value
 * @param runIffe
 * @returns
 */
declare const mset: (obj: Record<string, any>, path: PropPaths, value: SetValue, config?: MSetOptions) => void;
export default mset;
