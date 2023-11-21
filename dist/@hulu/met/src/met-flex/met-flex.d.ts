import { FC } from 'react';
import { MetProps } from '../met/met.js';
import { Property } from 'csstype';
export type MetPlacement = 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'topCenter' | 'bottomLeft' | 'bottomRight' | 'bottomCenter' | 'leftTop' | 'leftBottom' | 'leftMiddle' | 'rightTop' | 'rightBottom' | 'rightMiddle' | 'center' | 'between' | 'betweenTop' | 'betweenMiddle' | 'betweenBottom';
export interface MetFlexProps extends Omit<MetProps, 'scroll'> {
    inline?: boolean;
    vertical?: boolean;
    scroll?: boolean | 'overflowY' | 'overflowX' | 'overflow' | 'scroll';
    placement?: MetPlacement;
    wrap?: Property.FlexWrap;
    justify?: Property.JustifyContent;
    align?: Property.AlignItems;
    full?: boolean;
}
declare const MetFlex: FC<MetFlexProps>;
export default MetFlex;
