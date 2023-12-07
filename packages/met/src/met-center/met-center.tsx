import { FC } from 'react';
import MetFlex, { MetFlexProps } from '../met-flex/index.js';

export interface MetCenterProps extends MetFlexProps {
    pml?: boolean;
}

const MetCenter: FC<MetCenterProps> = (props) => {
    return <MetFlex placement={'center'} gap={8} {...props} />;
};

export default MetCenter;
