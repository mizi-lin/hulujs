/**
 * compact
 * 移除数据中包含的假值
 */
import { Collection } from './types.js';
export type CompactDegree = 'undefined' | 'null' | 'nil' | 'withoutZero' | 'not' | 'falsy';
declare function compact(collection: Collection, degree?: CompactDegree): any;
declare function compact(collection: Collection, func: (value: any, data: Collection) => boolean): any;
export default compact;
