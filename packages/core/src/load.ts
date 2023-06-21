import { tsImport } from './msc.js';
import { Repo } from './root.js';

const root = new Repo();

class Load {
    json(path: string) {}

    async ts(path: string) {
        const rst = await tsImport.load(path)
        return rst?.default ?? rst;
    }
}

const $load = new Load();

export { $load }