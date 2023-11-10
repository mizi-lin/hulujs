import { FC } from 'react';
import clx from 'classnames';
import { Met, type MetProps } from '../index.js';
import { isFalsy } from '@hulu/mu';

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

const adjustStyle = (value, type: 'Columns' | 'Rows') => {
    if (isFalsy(value)) return void 0;

    if (typeof value === 'number') {
        return {
            [`gridTemplate${type}`]: `repeat(${value}, 1fr)`
        };
    }

    if (Array.isArray(value) && typeof value[0] === 'number') {
        const [count, length] = value;
        const length$ = typeof length === 'number' ? `${length}px` : length;
        return {
            [`gridTemplate${type}`]: `repeat(${count}, ${length$})`
        };
    }

    const values = typeof value === 'string' ? value.trim().split(/\s+/g) : value;

    if (values.length === 1) {
        return {
            [`gridAuto${type}`]: values[0]
        };
    }

    return {
        [`gridTemplate${type}`]: values.join(' ')
    };
};

const MetGrid: FC<MetGridProps> = (props) => {
    const { children, inline, cols, rows, className = '', ...extra } = props;
    const attr = { ...adjustStyle(cols, 'Columns'), ...adjustStyle(rows, 'Rows') };
    return (
        <Met
            display="grid"
            className={clx('met-grid', className)}
            inline={inline}
            {...attr}
            {...extra}
        >
            {children}
        </Met>
    );
};

export default MetGrid;
