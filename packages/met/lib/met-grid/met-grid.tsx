import { FC } from 'react';
import clx from 'classnames';
import { Met, type MetProps } from '../index.js';
import { compact, isFalsy } from '@hulujs/mu';
import { Property } from 'csstype';

export interface MetGridProps extends Omit<MetProps, 'display'> {
    /**
     * cols 与 rows 规则一致
     * string: 即 string.split(' ') > 1 ? gridTemplateColumns(gridTemplateRows) : gridAutoRows
     * number: 即 gridTemplateColumns: repeat(4, 1fr)
     * [number, string]: 即 gridTemplateColumns: repeat(number, string)
     * string[]: 即 gridTemplateColumns: string[].join(' ')
     */
    cols?: number | Property.GridTemplateColumns | [number, string | number] | string[];
    rows?: number | Property.GridTemplateColumns | [number, string | number] | string[];
    align?: Property.AlignItems;
    justify?: Property.JustifyContent;
    inline?: boolean;
    full?: boolean;
}

const adjustStyle = (value, type: 'Columns' | 'Rows') => {
    if (isFalsy(value)) return void 0;

    /**
     * 当值为数字为时，直接使用 repeat(value, 1fr)
     * 平分，类似 repeat(auto-fit)
     */
    if (typeof value === 'number') {
        return {
            [`gridTemplate${type}`]: `repeat(${value}, 1fr)`
        };
    }

    /**
     * 当值为数组时[number, string]，使用 repeat(number, string)
     */
    if (Array.isArray(value) && typeof value[0] === 'number') {
        const [count, length] = value;
        const length$ = typeof length === 'number' ? `${length}px` : length;
        return {
            [`gridTemplate${type}`]: `repeat(${count}, ${length$})`
        };
    }

    const values = typeof value === 'string' ? value.trim().split(/\s+/g) : value;

    /**
     * 若只是单一值，则设置为 gridAutoRows / gridAutoColumns, 避免多于的网格高度不同
     */
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
    const {
        children,
        inline,
        cols,
        rows,
        className = '',
        align,
        alignItems = align,
        justify,
        justifyContent = justify,
        ...extra
    } = props;
    const attr = { ...adjustStyle(cols, 'Columns'), ...adjustStyle(rows, 'Rows') };
    return (
        <Met
            display="grid"
            className={clx('met-grid', className)}
            inline={inline}
            {...compact({ alignItems, justifyContent })}
            {...attr}
            {...extra}
        >
            {children}
        </Met>
    );
};

export default MetGrid;
