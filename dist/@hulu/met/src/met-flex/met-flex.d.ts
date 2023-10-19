import { FC } from 'react';
import { MetProps } from '../met/met.js';
import { Property } from 'csstype';
export type MetPlacement = 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom' | 'center' | 'betweenTop' | 'betweenMiddle' | 'betweenBottom';
export interface MetFlexProps extends MetProps {
    inline?: boolean;
    vertical?: boolean;
    scroll?: boolean | 'overflowY' | 'overflowX' | 'overflow' | 'scroll';
    placement?: MetPlacement;
    wrap?: Property.FlexWrap;
    justify?: Property.JustifyContent;
    align?: Property.AlignItems;
    fill?: boolean;
}
declare const MetFlex: FC<MetFlexProps>;
export default MetFlex;
