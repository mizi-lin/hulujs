import { FC } from 'react';
import { MetFlexProps } from '../met-flex/index.js';
export type MetBoxPlacement = 'top' | 'right' | 'bottom' | 'left';
export interface MetBoxProps extends Omit<MetFlexProps, 'placement'> {
    placement?: MetBoxPlacement;
}
declare const MetBox: FC<MetBoxProps>;
export default MetBox;
