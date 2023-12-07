declare class CaoKong {
    /**
     * ~ck 源地址前缀 prefix
     * // @todo 从 tsconfig.json / vite.config.ts 中读取
     */
    base(...paths: string[]): any;
    /**
     * 指向地址 target
     */
    target(...paths: string[]): any;
    /**
     * 获取ck路径的实际作用地址
     * @param address
     */
    trust(address: string): void;
}
export declare const $ck: CaoKong;
export {};
