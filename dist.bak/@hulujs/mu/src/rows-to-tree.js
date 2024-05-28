import { cloneDeep, groupBy, isNil } from 'lodash-es';
/**
 *
 * @param rows
 * @param options
 */
const rowsToTree = (rows, options = {}) => {
    const { keyname = 'key', parentname = 'parent', childrenname = 'children' } = options;
    // @todo
    // const rows$ = mapping(rows, mapper);
    const data = Object.isFrozen(rows) ? rows : cloneDeep(rows);
    const group = groupBy(data, parentname);
    data.forEach((parent) => {
        if (!isNil(parent[keyname])) {
            parent[childrenname] ??= [];
            parent[childrenname] = parent[childrenname].concat(group[parent[keyname]]).filter(Boolean);
        }
    });
    const nodes = data.filter(({ [parentname]: parent }) => !parent);
    return nodes;
};
export default rowsToTree;
