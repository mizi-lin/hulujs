import { MgetType, PropPaths } from '@hulujs/types';
import upArray from './up-array.js';
import mget from './mget.js';

function mgetx(obj: Record<string, any>, paths: PropPaths, type?: MgetType) {
    let paths$ = upArray(paths);
    return paths$.map((path) => mget(obj, path, type));
}

export default mgetx;
