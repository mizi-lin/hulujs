import { tsImport } from './msc.js';
import { Repo } from './root.js';
const root = new Repo();
class Load {
    json(path) { }
    async ts(path) {
        const rst = await tsImport.load(path);
        return rst?.default ?? rst;
    }
}
const $load = new Load();
export { $load };
