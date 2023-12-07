import { get } from 'lodash-es';
export const mget = (data, propPath) => {
    const path = Array.isArray(propPath) ? propPath.join('.') : propPath;
    if (Array.isArray(data)) {
        return mget({ data }, `data.${propPath}`);
    }
    // 无通配符计算
    if (!/\*/.test(path)) {
        return get(data, path);
    }
    // @todo 通配符计算
};
export default mget;
