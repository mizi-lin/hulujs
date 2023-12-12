import each from './each.js';
import mset from './mset.js';
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
    const pv$ = Array.isArray(pv)
        ? pv.map((item) => {
            // 默认itrem为 entires 格式
            return Array.isArray(item) ? item : Object.entries(item);
        })
        : Object.entries(pv);
    return { obj, pv: pv$ };
}
function msetx(...args) {
    const { obj, pv } = withArgs(args);
    each(pv, (item) => mset(obj, ...item, 'nest'));
}
export default msetx;
