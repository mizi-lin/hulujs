import isNil from './is-nil.js';
function baseStorage(storage, key, value) {
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
            return JSON.parse(rst);
        }
        catch (e) {
            return rst || void 0;
        }
    }
    const val = typeof value === 'string' ? value : JSON.stringify(value);
    storage.setItem(storageKey, val.replace(/^"(.*)"$/, '$1'));
    return void 0;
}
export function storage(...args) {
    const [key, value] = args;
    return baseStorage(window.localStorage, key, value);
}
export function sessionStorage(...args) {
    const [key, value] = args;
    return baseStorage(window.sessionStorage, key, value);
}
