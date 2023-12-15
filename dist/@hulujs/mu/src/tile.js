// /**
//  * 拍平集合体层级，呈扁平化显示
//  */
export const PROPPATH_SIGN = {
    // 匹配双引号
    DOUBLE_QUOTES: [`"`, `””`],
    // 匹配单引号
    SINGLE_QUOTES: [`'`, `‘‘`],
    // 匹配中括号
    LEFT_BRACKETS: [`[`, `【【`],
    RIGHT_BRACKETS: [`]`, `】】`],
    // 匹配点
    DOT: [`.`, `。。`],
    // 中划线
    STRIKE: [`-`, `————`]
};
export const canBracketRegex = () => {
    const str = Object.values(PROPPATH_SIGN)
        .map(([value]) => value)
        .join('\\');
    return new RegExp(`[${str}]`, 'g');
};
export const bracketKey = (key) => {
    if (typeof key === 'number')
        return key;
    const str = Object.values(PROPPATH_SIGN)
        .map(([value]) => value)
        .join('\\');
    const regex = new RegExp(`[${str}]`, 'g');
    return regex.test(key) ? `[${key}]` : key;
};
/**
 * cash to PropPath
 */
export const cashToPropPath = (cash, type = 'dot') => {
    if (typeof cash === 'string' || typeof cash === 'number')
        return cash;
    if (type === 'bracket')
        return `[${cash.join('][')}]`;
    return cash
        .map((item) => {
        if (typeof item === 'string') {
            return bracketKey(item);
        }
        return item;
    })
        .join('.');
};
export function objFlat(data) {
    let result = {};
    //recurse函数的两个参数分别为当前元素cur，和属性prop（用来判断对象是否有下一级）
    function recurse(cur, prop) {
        // if (isFalsy(cur)) {
        //     result[prop] = cur;
        // } else {
        if (Object(cur) !== cur) {
            //如果cur不是对象，那这就是最后一层，直接返回
            result[prop] = cur;
        }
        else if (Array.isArray(cur)) {
            //如果它是数组，并且不为空，那就遍历数组，对数组的每一项进行判断，数组元素是否符合我们的递归条件；如果数组为空，扁平化的对象元素的值就是空数组[]
            for (let i = 0; i < cur.length; i++) {
                recurse(cur[i], prop + '[' + i + ']');
            }
            if (cur.length === 0)
                result[prop] = [];
        }
        else {
            //否则这个元素是对象，那就遍历对象，并判断对象的每一个元素是否符合递归标准，如果符合再次进入recurse函数
            let isEmpty = true;
            for (let p in cur) {
                isEmpty = false;
                const key$ = /[.\[\]'"-]/.test(p) ? `[${p}]` : p;
                recurse(cur[p], prop ? prop + '.' + key$ : key$);
            }
            //这个元素的值是一个空对象{}
            if (isEmpty && prop)
                result[prop] = {};
        }
        // }
    }
    //第一次调用传入整个数据结构，第二个参数为空
    recurse(data, '');
    return result;
}
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
export default tile;
