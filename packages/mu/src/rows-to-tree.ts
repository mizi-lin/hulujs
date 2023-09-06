import { cloneDeep, groupBy, isNil } from 'lodash-es';

export type Row = Record<string, any>;
export type Rows = Record<string, any>[];

export interface RowsToTreeOption {
    keyname?: string;
    parentname?: string;
    childrenname?: string;
    mapper?: {
        key?: string;
        parent?: string;
    };
}

/**
 *
 * @param rows
 * @param options
 */
const rowsToTree = (rows: Rows, options: RowsToTreeOption = {}) => {
    const {
        keyname = 'key',
        parentname = 'parent',
        childrenname = 'children',
        mapper = {}
    } = options;

    // @todo
    // const rows$ = mapping(rows, mapper);

    const data = Object.isFrozen(rows) ? cloneDeep(rows) : rows;

    const group = groupBy(data, parentname);

    data.forEach((parent: Record<string, any>) => {
        if (!isNil(parent[keyname])) {
            parent[childrenname] ??= [];
            parent[childrenname] = parent[childrenname]
                .concat(group[parent[keyname]])
                .filter(Boolean);
        }
    });

    const nodes = data.filter(({ [parentname]: parent }: Record<string, any>) => !parent);

    return nodes;
};

export default rowsToTree;
