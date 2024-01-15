/**
 * compact
 * 移除数据中包含的假值
 */
import map from './map.js';
import run from './run.js';
import { baseStack } from './stack.js';
import tile from './tile.js';
import { compactDegreeFuncMap } from './utils/compact-degree-func-map.js';
import { isPlainObject } from 'lodash-es';
import { propCashToPath, propPathToCash } from './mget.js';
import isLikePovitiveInt from './is-like-positive-int.js';
const notInType = () => {
    console.warn(`compactType 不存在于 'undefined' | 'null' | 'nil' | 'withoutZero' | 'not' | 'falsy' `);
    return true;
};
function withArgs(args) {
    switch (args.length) {
        case 2:
            const [collection, undetermined] = args;
            if (isPlainObject(undetermined))
                return [collection, 'nil', undetermined];
            return [collection, undetermined];
        default:
            return args;
    }
}
export function baseCompact(...args) {
    const [collection, compactType = 'nil', config = {}] = withArgs(args);
    if (compactType === 'none')
        return collection;
    const func = run(typeof compactType === 'string', () => compactDegreeFuncMap[compactType] ?? notInType, () => compactType);
    const propPaths = tile(collection);
    // 补充字段
    // 如 a.b.c = undefined 过滤掉
    // 若 a.b.x 没有其他项，则 a.b 也将被过滤掉，这不合理，需要将 a.b 的值还原
    // a.b 的值根据 c 的值类型还原成 {} | [];
    const markup = {};
    const propPaths$clean = map(propPaths, (value, key) => {
        const isBreak = func?.(value, collection);
        if (isBreak) {
            const cash = propPathToCash(key, 'unwrapper');
            if (compactType !== 'fasly' && cash.length > 1) {
                const [tail, ...prev] = cash.toReversed();
                markup[propCashToPath(prev.toReversed())] = isLikePovitiveInt(tail) ? [] : {};
            }
            return '::break';
        }
        return value;
    });
    return baseStack({ ...markup, ...propPaths$clean }, config);
}
function compact(...args) {
    return baseCompact(...args);
}
export default compact;
