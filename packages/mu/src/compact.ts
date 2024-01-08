/**
 * compact
 * 移除数据中包含的假值
 */

import { Collection, CompactType, MSetOptions } from '@hulujs/types';
import map from './map.js';
import run from './run.js';
import stack, { baseStack } from './stack.js';
import tile from './tile.js';
import { compactDegreeFuncMap } from './utils/compact-degree-func-map.js';
import { cloneDeep, isPlainObject } from 'lodash-es';

const notInType = () => {
    console.warn(`compactType 不存在于 'undefined' | 'null' | 'nil' | 'withoutZero' | 'not' | 'falsy' `);
    return true;
};

function withArgs(args) {
    switch (args.length) {
        case 2:
            const [collection, undetermined] = args;
            if (isPlainObject(undetermined)) return [collection, 'nil', undetermined];
            return [collection, undetermined];
        default:
            return args;
    }
}

export function baseCompact(...args) {
    const [collection, compactType = 'nil', config = {}] = withArgs(args);

    if (compactType === 'none') return collection;

    const func = run(
        typeof compactType === 'string',
        () => compactDegreeFuncMap[compactType] ?? notInType,
        () => compactType
    );

    const propPaths = tile(collection);
    const propPaths$1 = map(propPaths, (value) => {
        return func?.(value, collection) ? '::break' : value;
    });

    return baseStack(propPaths$1, config);
}

function compact(collection: Collection, compactType?: CompactType);
function compact(collection: Collection, func: (value: any, data: Collection) => boolean);
function compact(...args) {
    return baseCompact(...args);
}

export default compact;
