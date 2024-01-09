import isFalsy from './is-falsy.js';
import map from './map.js';
import mget from './mget.js';
import { cloneDeep } from 'lodash-es';
import tile from './tile.js';
import stack from './stack.js';
/**
 * mapping
 * 数据映射
 * @param data
 * @param mapper
 * @param type: mapping 以映射为主，映射项为几项，返回就为几项，无值不返回
 *      | replace 为替换模式，将当前符合条件的key更换为mapper提供的key
 */
const mapping = (data, mapper, type = 'replace') => {
    if (typeof data !== 'object')
        return data;
    if (isFalsy(mapper))
        return data;
    if (isFalsy(data))
        return data;
    if (Array.isArray(data)) {
        return map(data, (item) => {
            return mapping(item, mapper, type);
        });
    }
    const tileMapper = tile(mapper);
    const tileMapping = map(tileMapper, (value) => {
        const type = typeof value;
        return ['string', 'number'].includes(type) ? mget(data, value) : type === 'function' ? value(data) : value;
    });
    const mappers = stack(tileMapping);
    if (type === 'mapping')
        return mappers;
    if (type === 'source')
        return { ...mappers, $source: cloneDeep(data), $mapper: mapper };
    if (type === 'replace')
        return { ...data, ...mappers };
    // return restate(data, (draft, { get }) => {
    //     const mapper$data = mu.map(mapper, (source, target) => {
    //         return typeof source === 'function' ? source(data) : get(source);
    //     });
    //     if (type === 'mapping') {
    //         return mapper$data;
    //     }
    //     if (type === 'increment') {
    //         return { ...draft, ...mapper$data };
    //     }
    //     const omitKeys = Object.values(mapper);
    //     const omitKeys$1 = omitKeys.filter((path) => {
    //         return !(/\./.test(path) || /\[.*]/.test(path));
    //     });
    //     const omit$draft = omit(draft, omitKeys$1);
    //     return { ...omit$draft, ...mapper$data };
    // });
};
export default mapping;
