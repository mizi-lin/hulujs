/**
 * 判断当前的key是否为subType
 * @param key
 */
import { EchartType, KvParis, SubType, SubTypeScope, SubTypeScopes, SubTypes } from '@hulujs/types';
/**
 * 判断是否为subtype(是否符合命名规范)
 * @param key
 * @returns
 */
export declare const isSubType: (key: string) => boolean;
export declare const getSubtypeKey: (key: string) => string;
/**
 * 提供方法快速注册subtype到注册中心
 * @param scopes subtype的作用域, 支持多个作用域配置
 * @param name subtype的名称
 * @param fn subtype的处理函数
 * @param warn subtype是否关闭提醒
 */
export declare const registerMetEchartsSubtypes: (scopes: SubTypeScopes, name: SubType, fn: (params: any) => KvParis, warn?: 'close') => void;
/**
 * 获取subtype的配置
 * @param scope
 * @param key
 * @param params
 * @returns
 */
export declare const getSubtype: (scope: SubTypeScope, key: string, params: Record<string, any>, options: Record<string, any>) => any;
/**
 * 获得subtype setting 信息
 * @param type
 * @param subtypes
 * @returns
 */
export declare const transformSubtype: (type: EchartType, subtypes: SubTypes, options: Record<string, any>) => any[];
