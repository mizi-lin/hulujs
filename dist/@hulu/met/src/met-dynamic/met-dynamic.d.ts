import { ReactNode, FC, ReactElement } from 'react';
import { type MetProps } from '../index.js';
export type RenderFunction = (...args: any) => ReactNode;
export type MetComponent = FC | ReactNode | RenderFunction;
export interface MetDynamicProps extends MetProps {
    component: ReactNode | ReactElement | RenderFunction;
    propCover?: boolean;
    [attr: string]: any;
}
declare const MetDynamic: FC<MetDynamicProps>;
export default MetDynamic;
