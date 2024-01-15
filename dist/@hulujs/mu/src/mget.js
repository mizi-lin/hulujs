import { each, isNil, isObject, join, uniqBy } from 'lodash-es';
import tile, { PROPPATH_SIGN } from './tile.js';
import map from './map.js';
import dichotomy from './dichotomy.js';
import isFalsy from './is-falsy.js';
import includes from './includes.js';
/**
 * 梳理过程中
 * 字符串与图标互换，防止配置过程中污染
 */
const replaceSign = (str, toggle = false) => {
    if (typeof str !== 'string')
        return str;
    let str$ = str;
    each(Object.values(PROPPATH_SIGN), (value) => {
        const regexp = toggle ? value[1] : `\\${value[0]}`;
        const placement = toggle ? value[0] : value[1];
        str$ = str$.replace(new RegExp(regexp, 'g'), placement);
    });
    return str$;
};
/**
 * 符号替换，让其支持复杂的属性链规则
 * @param matcher
 * @param p1
 */
const instead = (matcher, p1) => {
    const pText = replaceSign(p1);
    return `[${pText}]`;
};
/**
 * 将普通路径转为数组
 * 每个数据项为路径中的某一个节点
 */
// 将 a."b.c.d".[dd]c 转成 ['a'].['b.c.d'].['dd'].['c']
// 将 abcd["bbb"] 转成 ['abcd'].['bbb']
// 将 ac."[b.['c'].d]".ee[f] 转成 ['ac'].['b.["c"].d'].['ee'].['f']
// 将 [123][456].dd.ff.gg.[hh] 转成 ['123'].['456'].['dd'].['ff'].['gg'].['hh']
// 将 a.b.c.d.e.f.g.h.i.j.k 转成 ['a'].['b'].['c'].['d'].['e'].['f'].['g'].['h'].['i'].['j'].['k']
export const propPathToCash = (path, type) => {
    /**
     * 将下列的几种情况转为
     * - a."b.c.d".[dd]c
     * - a.["b.c.d"]."[dd]".c
     * - a."[b.c.d]".[dd].c
     * 转为
     * - a.[b.c.d].[dd].c
     */
    if (Array.isArray(path))
        return path;
    if (typeof path !== 'string')
        return [path];
    if (type === 'unwrapper') {
        path = path.replace(/^\[([^\]]*)\]$/g, '$1');
    }
    // 处理特殊字符创
    const path$ = path
        // 提取顶层双引号信息
        .replace(/^\[(.*)\]$/, instead)
        .replace(/^\"(.*?)\"\./g, instead)
        .replace(/\.\"(.*?)\"\./g, instead)
        .replace(/\.\"(.*?)\"$/g, instead)
        .replace(/\"(.*?)\"/g, instead)
        // 提取顶层单引号信息
        .replace(/^\'(.*?)\'\./g, instead)
        .replace(/\.\'(.*?)\'\./g, instead)
        .replace(/\.\'(.*?)\'$/g, instead)
        .replace(/\'(.*?)\'/g, instead)
        // 提取[]内的信息
        .replace(/\[([^\]]*)\]/g, instead);
    // 按`.[]`三个字符分割处理后的字符串
    const cashs = path$.split(/[.[\]]/g).filter(Boolean);
    const cashs$ = cashs.map((item) => {
        // 鸭子转换数字
        const key = /^\d+$/.test(item) ? Number(item) : item;
        // 字符还原
        return replaceSign(key, true);
    });
    return cashs$;
};
export const propCashToPath = (cash) => {
    if (!Array.isArray(cash))
        return cash;
    const signs = Object.values(PROPPATH_SIGN).map(([sign]) => sign);
    return cash
        .reduce((str, current) => {
        str += includes(current.toString().split(''), signs) ? `[${current}]` : `.${current}`;
        return str;
    }, '')
        .toString()
        .replace(/^\./, '');
};
const baseGet = (obj, path, prevCash = []) => {
    const cash = propPathToCash(path);
    // 占位通配符 '*'
    if (cash.includes('*')) {
        const [a, b] = dichotomy(cash, '*');
        // 判断通配符前段数据格式是否为对象，
        // 如果不是对象，则返回void
        // 如果是对象，则map取值
        const aData = baseGet(obj, a, prevCash);
        if (!isObject(aData?.value))
            return { value: void 0, cash: a };
        const result = map(aData?.value, (value, key) => {
            return baseGet(value, b, [...prevCash, ...a, key]);
        }, []);
        // 扁平化处理
        return result.flat(Infinity);
    }
    // 模糊通配符 '**'
    // 注意: 在模糊通配符后，再使用*其实是失效的
    if (cash.includes('**')) {
        const [a, b] = dichotomy(cash, '**');
        const aData = baseGet(obj, a, prevCash);
        if (!isObject(aData?.value))
            return { value: void 0, cash: a };
        // 模糊通配符下进行模糊匹配
        const tileData = tile(aData?.value, 'bracket');
        // if (isFalsy(b)) return [];
        const items = b.map((item) => {
            const str = item
                .split('')
                .map((char) => (char === '*' ? '' : char))
                .join('');
            return `(${str})`;
        });
        const regx = new RegExp(items.join('(.*)'));
        // 匹配 tile 的路径是完整的路径
        // 而查询的节点需要截断处理
        const matcher = Object.keys(tileData)
            .filter((key) => regx.test(key))
            .map((key) => {
            const cash = [...prevCash, ...a, ...propPathToCash(key)];
            return isFalsy(b) ? cash : cash.slice(0, cash.lastIndexOf(b.at(-1)) + 1);
        });
        // 去重
        const cashs = uniqBy(matcher, join);
        return cashs.map((cash) => {
            return baseGet(obj, cash);
        });
    }
    return cash.reduce(({ value, cash: cash$ }, key) => {
        const cash = [...cash$, key];
        if (isNil(value))
            return { value, cash };
        return { value: value[replaceSign(key, true)], cash };
    }, { value: obj, cash: prevCash });
};
/**
 * 通配符支持
 * - '*' 当前层级
 * - '**' 后代匹配值
 * @param obj
 * @param path
 * @param type: 'normal' | 'detail'
 * @returns
 */
const mget = (obj, path, type = 'normal') => {
    const result = baseGet(obj, path, []);
    if (type === 'detail')
        return result;
    if (Array.isArray(result)) {
        return result.filter(({ value }) => !!value).map(({ value }) => value);
    }
    return result.value;
};
export default mget;
// const users = [
//     {
//         name: '张三',
//         age: 18,
//         gender: 'male',
//         hobby: ['羽毛球', '足球'],
//         work: { '2022-2023': { info: '前端开发', salary: 10000 } },
//         address: { 'city.name': '北京市', province: '北京', area: { info: '东城区', postcode: '10001' } }
//     },
//     {
//         name: '李四',
//         age: 20,
//         gender: 'female',
//         hobby: ['电竞', '电影'],
//         address: { 'city.name': '上海市', province: '上海', area: { info: '黄浦区', postcode: '20001' } }
//     },
//     {
//         name: '王五',
//         age: 22,
//         gender: 'male',
//         hobby: ['旅行', '吃'],
//         address: { 'city.name': '广州市', province: '广东', area: { info: '越秀区', postcode: '30001' } }
//     }
// ];
// console.log(mget(users, `[0]["hobby"]['1']`));
// console.log(mget(users, `[1]["address"]"city.name"`));
// console.log(mget(users, `2.address["city.name"]`));
// console.log(mget(users, `*.address.province`));
// console.log(mget(users, `1.address.*.info`));
// console.log(mget(users, `*.address.*.info`));
// console.log(mget(users, `*.**.info`, 'detail'));
