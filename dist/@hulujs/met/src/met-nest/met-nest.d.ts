import { FC } from 'react';
import { Params } from '@hulujs/types';
import { MetProps } from '../met/met.js';
import { MetComponent } from '../met-dynamic/index.js';
export interface MetNestProps extends MetProps {
    components: (MetComponent | [MetComponent, Params])[];
    propCover?: boolean;
    [attr: string]: any;
}
/**
 * 嵌套组件
 * - 通常用于组件开发
 * @param props
 * @returns
 */
declare const MetNest: FC<MetNestProps>;
export default MetNest;
