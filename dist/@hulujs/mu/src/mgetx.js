import upArray from './up-array.js';
import mget from './mget.js';
function mgetx(obj, paths, type) {
    let paths$ = upArray(paths);
    return paths$.map((path) => mget(obj, path, type));
}
export default mgetx;
