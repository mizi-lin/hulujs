interface BaseStorageMethods {
    remove: (key: string) => void;
    clear: (key: string) => void;
}
/**
 * 将传入的数据按照指定的key存入localStorage
 * @param key 存入localStorage的key
 * @param value  存入localStorage的数据
 */
export declare function storage(): BaseStorageMethods;
export declare function storage(key: string): any;
export declare function storage(key: string, value: any): any;
/**
 * 将传入的数据按照指定的key存入sessionStorage
 * @param key 存入sessionStorage的key
 * @param value  存入sessionStorage的数据
 */
export declare function sessionStorage(): BaseStorageMethods;
export declare function sessionStorage(key: string): any;
export declare function sessionStorage(key: string, value: any): any;
export {};
