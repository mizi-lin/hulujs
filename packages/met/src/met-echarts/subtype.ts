/**
 * 判断当前的key是否为subType
 * @param key
 */

import { EchartType, KvParis, SubType, SubTypeScope, SubTypeScopes, SubTypes } from '@hulujs/types';
import { transformSetting } from './setting.js';
import { RegKey, Regc } from '@hulujs/msc';
import { isFalsy, upArray } from '@hulujs/mu';
import { isDev } from '../env.js';
import { cloneDeep } from 'lodash-es';

const SubTypeSep = '::';

/**
 * 判断是否为subtype(是否符合命名规范)
 * @param key
 * @returns
 */
export const isSubType = (key: string) => {
    return new RegExp(`^${SubTypeSep}`).test(key);
};

export const getSubtypeKey = (key: string) => {
    return isSubType(key) ? key : `${SubTypeSep}${key}`;
};

/**
 * 提供方法快速注册subtype到注册中心
 * @param scopes subtype的作用域, 支持多个作用域配置
 * @param name subtype的名称
 * @param fn subtype的处理函数
 * @param warn subtype是否关闭提醒
 */
export const registerSubtype = (scopes: SubTypeScopes, name: SubType, fn: (params) => KvParis, warn?: 'close') => {
    Regc.register(RegKey.MET_ECHARTS_SUBTYPES, (store) => {
        const store$ = store ?? new Map();
        const name$ = getSubtypeKey(name);
        upArray(scopes).forEach((scope) => {
            const regkey = `${scope}${name$}`;
            if (isDev && warn !== 'close' && store$.has(regkey)) {
                console.log(`[Regc]: ${regkey} 已注册，注册中心采用覆盖策略，请确认？(若不想收到该消息，请在方法中配置 warn: 'close')`);
            }
            store$.set(regkey, fn);
        });
        return store$;
    });
};

/**
 * 获取subtype的配置
 * @param scope
 * @param key
 * @param params
 * @returns
 */
export const getSubtype = (scope: SubTypeScope, key: string, params: Record<string, any>, options: Record<string, any>) => {
    if (!key) return [];
    const name$ = getSubtypeKey(key);
    const regkey = `${scope}${name$}`;
    const store$ = Regc.get<Map<string, any>>(RegKey.MET_ECHARTS_SUBTYPES);
    const params$ = { ...params, scope, subtype: key, options: Object.freeze(cloneDeep(options)) };
    const func = store$.get(regkey);
    if (scope === 'all') return func?.(params$) ?? [];
    // 默认读取基于图表类型的subtype, 若没有则读取全局的scope
    return (func ?? store$.get(`all${key}`))?.({ ...params$, scope: func ? scope : 'all' }) ?? [];
};

/**
 * 获得subtype setting 信息
 * @param type
 * @param subtypes
 * @returns
 */
export const transformSubtype = (type: EchartType, subtypes: SubTypes, options: Record<string, any>) => {
    if (isFalsy(subtypes)) return [];
    return transformSetting(type, upArray(subtypes), options);
};
