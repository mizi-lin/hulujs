import { FC } from 'react';
import MetFlex, { MetFlexProps } from '../met-flex/index.js';

export interface MetLeftProps extends MetFlexProps {}

const MetLeft: FC<MetLeftProps> = (props) => {
    return <MetFlex placement={'left'} gap={8} {...props} />;
};

export default MetLeft;
