import { FC } from 'react';
import MetFlex, { MetFlexProps } from '../met-flex/index.js';

export type MetBoxPlacement = 'top' | 'right' | 'bottom' | 'left';
export interface MetBoxProps extends Omit<MetFlexProps, 'placement'> {
    placement?: MetBoxPlacement;
}

const MetBox: FC<MetBoxProps> = (props) => {
    const { className, ...extra } = props;
    return (
        <MetFlex alignItems={'stretch'} placement={'normal'} overflowY={'auto'} className={['met-box', className]} vertical {...extra} />
    );
};

export default MetBox;
