import types from './types.js';
import each, { IterateeCollection, MapIteratee } from './each.js';
import { has } from 'lodash-es';

const map = (
    collect: IterateeCollection,
    iteratee: MapIteratee,
    initialValue?: Record<string, any> | Record<string, any>[]
): any => {
    const resultType = types(initialValue ?? collect, 'object');
    const resultTypeInitialValue = resultType ? initialValue ?? {} : initialValue ?? [];

    each(collect, (value, key, source) => {
        const result = iteratee(value, key, source);

        if (
            typeof result === 'string' &&
            ['::false', '::break', '__BREAK__', '__SKIP__', '__remove_map__'].includes(result)
        ) {
            return false;
        }

        if (types(result, 'object') && (has(result, '::key') || has(result, '__key__'))) {
            const key = result['::key'] ?? result['__key__'];
            const value = result['::value'] ?? result['__value__'];
            !resultType && resultTypeInitialValue.push({ [key]: value });
            resultType && (resultTypeInitialValue[key] = value);
        } else {
            !resultType && resultTypeInitialValue.push(result);
            resultType && (resultTypeInitialValue[key as any] = result);
        }
    });

    return resultTypeInitialValue;
};

export default map;
