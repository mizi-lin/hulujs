import { jsx as _jsx } from "react/jsx-runtime";
import { MetGene } from '@hulujs/met';
import { useContext } from 'react';
import { MetGeneContext } from '../met-gene/met-gene.js';
/**
 * 桥接基因组件穿越context
 * @param props
 * @returns
 */
const MetBridge = (props) => {
    const { children } = props;
    const context = useContext(MetGeneContext);
    return (_jsx(MetGene, { dominant: context, bridge: true, children: children }));
};
export default MetBridge;
