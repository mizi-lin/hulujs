import { FC } from 'react';
import { type MetProps } from '../index.js';
export interface MetGridProps extends Omit<MetProps, 'display'> {
    /**
     * cols 与 rows 规则一致
     * string: 即 string.split(' ') > 1 ? gridTemplateColumns(gridTemplateRows) : gridAutoRows
     * number: 即 gridTemplateColumns: repeat(4, 1fr)
     * [number, string]: 即 gridTemplateColumns: repeat(number, string)
     * string[]: 即 gridTemplateColumns: string[].join(' ')
     */
    cols?: number | string | [number, string | number] | string[];
    rows?: number | string | [number, string | number] | string[];
    inline?: boolean;
}
declare const MetGrid: FC<MetGridProps>;
export default MetGrid;
