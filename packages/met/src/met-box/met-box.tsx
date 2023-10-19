import { FC } from 'react';
import MetFlex, { MetFlexProps } from '../met-flex/index.js';

export type MetBoxPlacement = 'top' | 'right' | 'bottom' | 'right';
export interface MetBoxProps extends Omit<MetFlexProps, 'placement'> {
    placement?: MetBoxPlacement;
}

const MetBox: FC<MetBoxProps> = (props) => {
    const { className, ...extra } = props;
    return (
        <MetFlex
            alignItems={'stretch'}
            placement={'top'}
            overflowY={'auto'}
            className={['met-box', className]}
            vertical
            {...extra}
        />
    );
};

export default MetBox;
