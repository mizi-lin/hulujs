import { FC } from 'react';
import clx from 'classnames';
import Met, { MetProps } from '../met/met.js';
import { Property } from 'csstype';
import { compact } from '@hulu/mu';

export type MetPlacement =
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom'
    | 'center'
    | 'betweenTop'
    | 'betweenMiddle'
    | 'betweenBottom';

export interface MetFlexProps extends MetProps {
    inline?: boolean;
    vertical?: boolean;
    placement?: MetPlacement;
    wrap?: Property.FlexWrap;
    justify?: Property.JustifyContent;
    align?: Property.AlignItems;
}

const placementStyleMap = {
    row: {
        top: { justifyContent: 'center', alignItems: 'flex-start' },
        topLeft: { justifyContent: 'flex-start', alignItems: 'flex-start' },
        topRight: { justifyContent: 'flex-end', alignItems: 'flex-start' },
        left: { justifyContent: 'flex-start', alignItems: 'center' },
        leftTop: { justifyContent: 'flex-start', alignItems: 'flex-start' },
        leftBottom: { justifyContent: 'flex-start', alignItems: 'flex-end' },
        right: { justifyContent: 'flex-end', alignItems: 'center' },
        rightTop: { justifyContent: 'flex-end', alignItems: 'flex-start' },
        rightBottom: { justifyContent: 'flex-end', alignItems: 'flex-end' },
        bottom: { justifyContent: 'center', alignItems: 'flex-end' },
        bottomLeft: { justifyContent: 'flex-start', alignItems: 'flex-end' },
        bottomRight: { justifyContent: 'flex-end', alignItems: 'flex-end' },
        center: { justifyContent: 'center', alignItems: 'center' },
        betweenTop: { justifyContent: 'space-between', alignItems: 'flex-start' },
        betweenMiddle: { justifyContent: 'space-between', alignItems: 'center' },
        betweenBottom: { justifyContent: 'space-between', alignItems: 'flex-end' }
    },

    column: {
        top: { alignItems: 'center', justifyContent: 'flex-start' },
        topLeft: { alignItems: 'flex-start', justifyContent: 'flex-start' },
        topRight: { alignItems: 'flex-end', justifyContent: 'flex-start' },
        left: { alignItems: 'flex-start', justifyContent: 'center' },
        leftTop: { alignItems: 'flex-start', justifyContent: 'flex-start' },
        leftBottom: { alignItems: 'flex-start', justifyContent: 'flex-end' },
        right: { alignItems: 'flex-end', justifyContent: 'center' },
        rightTop: { alignItems: 'flex-end', justifyContent: 'flex-start' },
        rightBottom: { alignItems: 'flex-end', justifyContent: 'flex-end' },
        bottom: { alignItems: 'center', justifyContent: 'flex-end' },
        bottomLeft: { alignItems: 'flex-start', justifyContent: 'flex-end' },
        bottomRight: { alignItems: 'flex-end', justifyContent: 'flex-end' },
        center: { alignItems: 'center', justifyContent: 'center' },
        betweenTop: { alignItems: 'flex-start', justifyContent: 'space-between' },
        betweenMiddle: { alignItems: 'center', justifyContent: 'space-between' },
        betweenBottom: { alignItems: 'flex-end', justifyContent: 'space-between' }
    }
};

const MetFlex: FC<MetFlexProps> = (props) => {
    const {
        children,
        style = {},
        className = '',
        placement = 'left',
        vertical,
        inline,
        wrap = 'nowrap',
        justify,
        align,
        flexWrap = wrap,
        flexDirection = vertical ? 'column' : 'row',
        justifyContent = justify,
        alignItems = align,
        ...extra
    } = props;

    const extra$: MetProps = {
        display: inline ? 'inline-flex' : 'flex',
        ...(placementStyleMap[flexDirection]?.[placement] ?? {}),
        ...compact({ flexDirection, flexWrap, justifyContent, alignItems }),
        ...extra
    };

    return (
        <Met className={clx('met-flex', className)} {...extra$}>
            {children}
        </Met>
    );
};

export default MetFlex;
