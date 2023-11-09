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
declare const rowsToTree: (rows: Rows, options?: RowsToTreeOption) => Record<string, any>[];
export default rowsToTree;
