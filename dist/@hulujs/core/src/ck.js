import path from 'path';
import { $repo } from './root.js';
class CaoKong {
    /**
     * ~ck 源地址前缀 prefix
     * // @todo 从 tsconfig.json / vite.config.ts 中读取
     */
    base(...paths) {
        return $repo.hulu('.caokong', 'src', ...paths);
    }
    /**
     * 指向地址 target
     */
    target(...paths) {
        return $repo.src(...paths);
    }
    /**
     * 获取ck路径的实际作用地址
     * @param address
     */
    trust(address) {
        // ck prefix
        const base = this.base();
        // relative path
        const relative = path.relative(base, address);
        const source = path.parse(address);
    }
}
export const $ck = new CaoKong();
