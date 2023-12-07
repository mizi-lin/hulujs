/**
 * 拍平集合体层级，呈扁平化显示
 */
import { CompactDegree } from './compact.js';
import { Collection } from './types.js';
/**
 * mu.tile
 * 将一个对象平铺展开,
 * 因性能问题，不提倡在大对象中平铺处理
 * @param obj
 * @param chainMode: chain模式下，tile后不能被stack还原原来的值
 * @compact false | CompactDegree: 若传入 compact, 执行 degree 规则
 * @default true, 先实现ChainMode模式，反人类设置，就这样吧
 *
 *
 * mu.tile({ a: { b: 'c', e: 'e3' } })
 * // => { 'a.b': 'c', 'a.e': 'e3' }
 *
 * mu.tile([1])
 * // => { '[0]': 1 }
 *
 * mu.tile({ 'a.a': { b: 'c', 'e[sss]': 'e3' } })
 * // => { '["["a.a"].b"]': 'c', '["["a.a"].["e[sss]"]"]': 'e3' }
 *
 * mu.tile({ 'a.a': { b: 'c', 'e[sss]': 'e3' } }, false)
 * // => { '["["a.a"].b"]': 'c', '["["a.a"].["e[sss]"]"]': 'e3' }
 *
 * mu.tile({ 'a.a': { b: 'c', 'e[sss]': 'e3' } }, true)
 * // => { 'a.a.b': 'c', 'e[sss]': 'e3 }
 *
 *  mu.tile({ a: 1, b: false, c: {}, d: [false] }, false, 'falsy')
 * // => { a: 1 }
 */
declare function tile(obj: Collection, chainMode?: boolean, compact?: false | CompactDegree): any;
export default tile;
