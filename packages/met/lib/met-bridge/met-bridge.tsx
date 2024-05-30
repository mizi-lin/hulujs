import { MetGene, MetGeneProps } from '@hulujs/met';
import { FC, useContext } from 'react';
import { MetGeneContext } from '../met-gene/met-gene.js';

export interface MetBridgeProps extends MetGeneProps {}

/**
 * 桥接基因组件穿越context
 * @param props
 * @returns
 */
const MetBridge: FC<MetBridgeProps> = (props) => {
    const { children } = props;
    const context = useContext(MetGeneContext);
    return (
        <MetGene dominant={context} bridge={true}>
            {children}
        </MetGene>
    );
};

export default MetBridge;
