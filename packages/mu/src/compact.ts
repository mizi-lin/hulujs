/**
 * compact
 * 移除数据中包含的假值
 */

import { Collection, CompactType } from '@hulujs/types';
import map from './map.js';
import run from './run.js';
import stack from './stack.js';
import tile from './tile.js';
import { compactDegreeFuncMap } from './utils/compact-degree-func-map.js';

function compact(collection: Collection, compactType?: CompactType);
function compact(collection: Collection, func: (value: any, data: Collection) => boolean);
function compact(...args) {
    const [collection, compactType = 'nil'] = args;

    if (compactType === 'none') return collection;

    const notInType = () => {
        console.warn(`compactType 不存在于 'undefined' | 'null' | 'nil' | 'withoutZero' | 'not' | 'falsy' `);
        return true;
    };

    const func = run(
        typeof compactType === 'string',
        () => compactDegreeFuncMap[compactType] ?? notInType,
        () => compactType
    );

    const propPaths = tile(collection);
    const propPaths$1 = map(propPaths, (value) => {
        return func?.(value, collection) ? '::break' : value;
    });
    return stack(propPaths$1);
}

export default compact;
