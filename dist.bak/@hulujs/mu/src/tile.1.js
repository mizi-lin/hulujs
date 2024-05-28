/**
 * 平铺对象
 */
export const tile = (obj, chainType = 'dot') => {
    // 点式调用优先
    const isDot = chainType === 'dot';
    let result = {};
    function recurse(current, props = '') {
        // 如果当前值不是对象，直接返回
        if (Object(current) !== current) {
            result[props] = current;
        }
        else if (Array.isArray(current)) {
            // 如果是数组，进入遍历递归
            for (let i = 0; i < current.length; i++) {
                recurse(current[i], `${props}[${i}]`);
            }
            if (!current.length)
                return (result[props] = []);
        }
        else if (typeof current === 'function') {
            result[props] = current;
        }
        else {
            // 如果是对象，遍历对象
            let isEmpty = true;
            for (let key in current) {
                isEmpty = false;
                if (isDot) {
                    // todo 将key的判断为加所有的特殊字符
                    const key$ = /[.\[\]'"-]/.test(key) ? `[${key}]` : key;
                    recurse(current[key], props ? `${props}.${key$}` : key$);
                }
                else {
                    recurse(current[key], `${props}[${key}]`);
                }
            }
            if (isEmpty)
                return (result[props] = {});
        }
    }
    recurse(obj);
    return result;
};
