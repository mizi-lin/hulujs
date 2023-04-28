import { Tpl } from '@hulu/core';
import { sortBy } from 'lodash-es';
import path from 'path';

/**
 * 获得模版信息
 */
export const getTplInfo = (way: string) => {
    const emoj = { single: '✳︎', dir: '✣' };
    const typeName = { single: '单文件', dir: '文件夹' };
    const tpl = new Tpl();
    const { name, description, address, type, target } = JSON.parse(tpl.read(way));
    const label = `${emoj[type]} ${name}: ${description} (${typeName[type]})`;
    const address$absoulte = path.join(path.dirname(way), address);
    return {
        value: { absoulte: address$absoulte, address, type, target },
        label,
        name,
        type
    };
};

/**
 * 代码模板类型列表
 */
export const getGenerates = (paths: string[]) => {
    const infos = paths.map(getTplInfo);
    return sortBy(infos, 'type');
};
