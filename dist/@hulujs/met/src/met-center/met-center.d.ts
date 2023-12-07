import { FC } from 'react';
import { MetFlexProps } from '../met-flex/index.js';
export interface MetCenterProps extends MetFlexProps {
    pml?: boolean;
}
declare const MetCenter: FC<MetCenterProps>;
export default MetCenter;
