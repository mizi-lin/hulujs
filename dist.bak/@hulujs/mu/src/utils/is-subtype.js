/**
 * 判断当前的key是否为subType
 * @param key
 */
const isSubType = (key) => {
    const sep = '::';
    return new RegExp(`^${sep}$`).test(key);
};
export {};
