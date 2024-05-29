import { SetValue, PropPaths, MSetOptions } from '@hulujs/types';
import each from './each.js';
import mset from './mset.js';
import parisToEntries from './paris-to-entries.js';

/**
 * msetx
 * mset 的增强版
 * 通过键值对集合批量配置
 */
function msetx(obj: Record<string, any>, pathValue: Record<string, SetValue>, options?: MSetOptions);
function msetx(obj: Record<string, any>, pathValue: Record<string, SetValue>[], options?: MSetOptions);
function msetx(obj: Record<string, any>, pathValue: [string, SetValue][], options?: MSetOptions);
function msetx(...args) {
    const [obj, pathValue, options] = args;
    const pv = parisToEntries(pathValue);
    each(pv, (item: [string, SetValue]) => {
        mset(obj, ...item, options);
    });
}

export default msetx;
