import { FC, ReactNode } from 'react';
import { RecoilValue } from 'recoil';
import { MetGeneProps, MetProps } from '../index.js';
import { RuyiOptions } from '@hulujs/msc';
export type Transmit = '@' | string | Record<string, string>;
export interface MetRuyiProps extends Omit<MetGeneProps, 'className'>, MetProps {
    url?: string;
    method?: string;
    params?: Record<string, any>;
    payload?: Record<string, any>;
    selector?: RecoilValue<any>;
    options?: RuyiOptions;
    nodata?: false | ReactNode;
    loading?: false | ReactNode;
    error?: false | ReactNode | (() => ReactNode);
    transmit?: Transmit;
    onErrorReset?: (details: any) => void;
}
declare const MetRuyi: FC<MetRuyiProps>;
export default MetRuyi;
