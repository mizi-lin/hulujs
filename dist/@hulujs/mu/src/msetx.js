import each from './each.js';
import mset from './mset.js';
import parisToEntries from './paris-to-entries.js';
function msetx(...args) {
    const [obj, pathValue, options] = args;
    const pv = parisToEntries(pathValue);
    each(pv, (item) => {
        mset(obj, ...item, options);
    });
}
export default msetx;
