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
declare const mapping: (data: DataRow | DataRow[], mapper: Mapper, type?: MappingType) => any;
export default mapping;
