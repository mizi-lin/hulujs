import { FC } from 'react';
import MetFlex, { MetFlexProps } from '../met-flex/index.js';

export interface MetCenterProps extends MetFlexProps {}

const MetCenter: FC<MetCenterProps> = (props) => {
    return <MetFlex placement={'center'} {...props} />;
};

export default MetCenter;
