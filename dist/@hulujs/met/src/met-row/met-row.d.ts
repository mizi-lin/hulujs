import { FC } from 'react';
import { MetFlexProps } from '../met-flex/index.js';
export type MetRowPlacement = 'top' | 'right' | 'bottom' | 'right';
export interface MetRowProps extends Omit<MetFlexProps, 'placement'> {
    placement?: MetRowPlacement;
}
declare const MetRow: FC<MetRowProps>;
export default MetRow;
