import { FC } from 'react';
import MetFlex, { MetFlexProps } from '../met-flex/index.js';

export type MetRowPlacement = 'top' | 'right' | 'bottom' | 'right';
export interface MetRowProps extends Omit<MetFlexProps, 'placement'> {
    placement?: MetRowPlacement;
}

const MetRow: FC<MetRowProps> = (props) => {
    const { className, ...extra } = props;
    return (
        <MetFlex
            alignItems={'stretch'}
            placement={'left'}
            vertical={false}
            className={[className, 'met-row']}
            {...extra}
        />
    );
};

export default MetRow;
