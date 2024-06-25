/**
 * 获取随机id
 * -> 并不保证在极短时间内生成大量的ID，不会出现重复现象
 * -> 长度越长重复的几率越小
 * @param length
 * @param twostage 是否支持两段式 `{string}-{string}`
 */
const rn = function (max) {
    return (Math.random() * max) % max | 0;
};

export function rid(len = 8, twostage = false) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghijklmnopqrstuvwxyz';
    let key = '';
    const charsLen = chars.length;
    for (let i = 0; i < len; i++) {
        key += chars[rn(charsLen)];
    }
    return twostage ? `${Date.now().toString(36)}-${key}` : key;
}

export default rid;
