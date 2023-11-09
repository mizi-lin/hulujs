import { FC, ReactNode } from 'react';
import { MetFlexProps } from '../index.js';
export interface MetNodataProps extends MetFlexProps {
    component?: ReactNode;
    description?: ReactNode;
}
/**
 * @todo 父元素过高的时候，显示区域设置
 * @todo 父元素无高度的时，高度配置
 * @todo nodata, loading component 可以全局配置
 */
declare const MetNodata: FC<MetNodataProps>;
export default MetNodata;
