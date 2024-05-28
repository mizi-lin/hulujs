import { MetGeneProps } from '@hulujs/met';
import { FC } from 'react';
export interface MetBridgeProps extends MetGeneProps {
}
/**
 * 桥接基因组件穿越context
 * @param props
 * @returns
 */
declare const MetBridge: FC<MetBridgeProps>;
export default MetBridge;
