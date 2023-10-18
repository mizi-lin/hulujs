import { ReactNode, FC } from 'react';
import { MetProps } from 'src/met/met.js';
export type RenderFunction = (...args: any) => ReactNode;
export type MetComponent = FC | ReactNode | RenderFunction;
export interface MetDynamicProps extends MetProps {
    component: ReactNode | RenderFunction;
    propCover?: boolean;
    [attr: string]: any;
}
declare const MetDynamic: FC<MetDynamicProps>;
export default MetDynamic;
