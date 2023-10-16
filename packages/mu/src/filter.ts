import { Iteratee } from './each.js';
import map from './map.js';
import { Collection } from './types.js';

const filter = (collection: Collection, iteratee: Iteratee) => {
    return map(collection, () => {});
};

export default filter;
