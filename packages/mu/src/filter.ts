import { Collection } from '@hulujs/types';
import { Iteratee } from './each.js';
import map from './map.js';

const filter = (collection: Collection, iteratee: Iteratee) => {
    return map(collection, () => {});
};

export default filter;
