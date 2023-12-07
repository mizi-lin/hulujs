import { FC, ReactNode } from 'react';
import { MetCenterProps } from '../index.js';
export interface MetLoadingProps extends MetCenterProps {
    component?: ReactNode;
}
/**
 * @todo 父元素过高的时候，显示区域设置
 * @todo 父元素无高度的时，高度配置
 */
declare const MetLoading: FC<MetLoadingProps>;
export default MetLoading;
