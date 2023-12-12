import { SetValue, PropPaths } from '@hulujs/types';
/**
 * msetx
 * mset 的增强版
 * 通过键值对集合批量配置
 */
declare function msetx(obj: Record<string, any>, pathValue: Record<string, SetValue>): any;
declare function msetx(obj: Record<string, any>, pathValue: Record<string, SetValue>[]): any;
declare function msetx(obj: Record<string, any>, pathValue: [string, SetValue][]): any;
declare function msetx(obj: Record<string, any>, path: PropPaths, value: SetValue): any;
export default msetx;
