import { get } from 'lodash-es';
import isFalsy from './is-falsy.js';
import map from './map.js';

export type MappingType = 'mapping' | 'replace' | 'increment';
export type MapperValue = string | ((source: any) => any);
export type Mapper = Record<string, MapperValue>;
export type DataRow = Record<string, any>;

/**
 * mapping
 * 数据映射
 * @param data
 * @param mapper
 * @param type: mapping 以映射为主，映射项为几项，返回就为几项，无值不返回
 *      | replace 为替换模式，将当前符合条件的key更换为mapper提供的key
 *      | increment 增量模式，不直接修改key, 而为增加key
 */
const mapping = (data: DataRow | DataRow[], mapper: Mapper, type: MappingType = 'replace') => {
    if (typeof data !== 'object') return data;
    if (isFalsy(mapper)) return data;
    if (isFalsy(data)) return data;

    if (Array.isArray(data)) {
        return map(data, (item) => {
            return mapping(item, mapper, type);
        });
    }

    const mappers = map(mapper, (mapperValue: MapperValue) => {
        return typeof mapperValue === 'string' ? get(data, mapperValue) : mapperValue(data);
    });

    if (type === 'mapping') return mappers;
    if (type === 'replace') return { ...data, ...mappers };

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
