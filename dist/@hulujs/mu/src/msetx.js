import each from './each.js';
import mset from './mset.js';
import { isPlainObject } from 'lodash-es';
import parisToEntries from './paris-to-entries.js';
/**
 * withArgs
 * 处理重构参数的方法
 * 将所有的参数的参数形式转成 { obj, pv }
 * pv 为键值对的entires格式
 * @param args
 * @returns
 */
function withArgs(args) {
    if (args.length === 3) {
        const [obj, path, value] = args;
        return { obj, pv: [[path, value]] };
    }
    if (args.length !== 2) {
        throw new Error('msetx 参数错误');
    }
    const [obj, pv] = args;
    let pv$ = [];
    if (isPlainObject(pv)) {
        pv$ = Object.entries(pv);
    }
    if (Array.isArray(pv)) {
        // [['a.b.c', 1], { 'a.1': 1}, { 'a.2': 2, 'a.3': 3}, [{ 'a.4': 4, 'a.5': 5}]]
        //
    }
    // const pv$ = Array.isArray(pv)
    //     ? pv.map((item) => {
    //           // 默认itrem为 entires 格式
    //           return Array.isArray(item) ? item : Object.entries(item);
    //       })
    //     : Object.entries(pv);
    return { obj, pv: pv$ };
}
function msetx(...args) {
    const [obj, ...extra] = args;
    const pv = parisToEntries(...extra);
    each(pv, (item) => mset(obj, ...item, 'nest'));
}
export default msetx;
