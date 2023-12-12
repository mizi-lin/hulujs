import { KvParis, KvEntries } from '@hulujs/types';
/**
 * parisToEntries
 * 将 KvParis 的数据类型 转为 KvEntries 的数据类型
 * - 应用场景
 * -- 插件体系
 */
declare const parisToEntries: (paris?: KvParis) => KvEntries;
export default parisToEntries;
