import { FC } from 'react';
import { Property } from 'csstype';
import { MetProps } from '@hulujs/met';
export type MetPlacement = 'normal' | 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'topCenter' | 'bottomLeft' | 'bottomRight' | 'bottomCenter' | 'leftTop' | 'leftBottom' | 'leftMiddle' | 'rightTop' | 'rightBottom' | 'rightMiddle' | 'center' | 'between' | 'betweenTop' | 'betweenMiddle' | 'betweenBottom';
export interface MetFlexProps extends Omit<MetProps, 'scroll'> {
    inline?: boolean;
    vertical?: boolean;
    scroll?: boolean | 'overflowY' | 'overflowX' | 'overflow' | 'auto';
    placement?: MetPlacement;
    wrap?: Property.FlexWrap;
    justify?: Property.JustifyContent;
    align?: Property.AlignItems;
}
declare const MetFlex: FC<MetFlexProps>;
export default MetFlex;
