import isNil from './is-nil.js';
import { LocalStorage } from './utils/node-storage.js';

interface BaseStorageMethods {
    remove: (key: string) => void;
    clear: (key: string) => void;
}

function baseStorage(storage: Storage, key?: string, value?: any): BaseStorageMethods | string | Record<string, any> | any[] | unknown {
    if (isNil(key)) {
        return {
            remove: function (key) {
                storage.removeItem(key);
            },
            clear: function () {
                storage.clear();
            }
        };
    }

    // 保证 storageKey 为 string 类型
    const storageKey = String(key);

    if (isNil(value)) {
        const rst = storage.getItem(storageKey);
        try {
            return JSON.parse(rst as string);
        } catch (e) {
            return rst || void 0;
        }
    }

    const val = typeof value === 'string' ? value : JSON.stringify(value);
    storage.setItem(storageKey, val.replace(/^"(.*)"$/, '$1'));
    return void 0;
}

/**
 * 将传入的数据按照指定的key存入localStorage
 * @param key 存入localStorage的key
 * @param value  存入localStorage的数据
 */
export function storage(): BaseStorageMethods;
export function storage(key: string): any;
export function storage(key: string, value: any);
export function storage(...args) {
    const [key, value] = args;
    const storge = typeof window !== 'undefined' ? window.localStorage : new LocalStorage('./node_modules/.cache/hulu.local');
    return baseStorage(storge, key, value);
}
/**
 * 将传入的数据按照指定的key存入sessionStorage
 * @param key 存入sessionStorage的key
 * @param value  存入sessionStorage的数据
 */
export function session(): BaseStorageMethods;
export function session(key: string): any;
export function session(key: string, value: any);
export function session(...args) {
    const [key, value] = args;
    const storge = typeof window !== 'undefined' ? window.sessionStorage : new LocalStorage('./node_modules/.cache/hulu.session');
    return baseStorage(storge, key, value);
}
