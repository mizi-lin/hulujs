/**
 * compact
 * 移除数据中包含的假值
 */

import map from './map.js';
import run from './run.js';
import stack from './stack.js';
import tile from './tile.js';
import { Collection } from './types.js';
import { compactDegreeFuncMap } from './utils/compact-degree-func-map.js';

export type CompactDegree = 'undefined' | 'null' | 'nil' | 'withoutZero' | 'not' | 'falsy';

function compact(collection: Collection, degree?: CompactDegree);
function compact(collection: Collection, func: (value: any, data: Collection) => boolean);
function compact(...args) {
    const [collection, degree = 'nil'] = args;

    const notInDegree = () => {
        console.warn(
            `degree 不存在于 'undefined' | 'null' | 'nil' | 'withoutZero' | 'not' | 'falsy' `
        );
        return true;
    };
    const func = run(
        typeof degree === 'string',
        () => compactDegreeFuncMap[degree] ?? notInDegree,
        () => degree
    );
    const ppths = tile(
        collection,
        false,
        typeof degree === 'string' ? (degree as CompactDegree) : false
    );
    const ppths$1 = map(ppths, (value) => {
        return func?.(value, collection) ? '::break' : value;
    });
    return stack(ppths$1);
}

export default compact;
