/**
 * compact
 * 移除数据中包含的假值
 */
import { Collection, CompactType } from '@hulujs/types';
export declare function baseCompact(...args: any[]): any;
declare function compact(collection: Collection, compactType?: CompactType): any;
declare function compact(collection: Collection, func: (value: any, data: Collection) => boolean): any;
export default compact;
