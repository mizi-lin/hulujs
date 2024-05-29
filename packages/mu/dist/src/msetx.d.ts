import { SetValue, MSetOptions } from '@hulujs/types';
/**
 * msetx
 * mset 的增强版
 * 通过键值对集合批量配置
 */
declare function msetx(obj: Record<string, any>, pathValue: Record<string, SetValue>, options?: MSetOptions): any;
declare function msetx(obj: Record<string, any>, pathValue: Record<string, SetValue>[], options?: MSetOptions): any;
declare function msetx(obj: Record<string, any>, pathValue: [string, SetValue][], options?: MSetOptions): any;
export default msetx;
