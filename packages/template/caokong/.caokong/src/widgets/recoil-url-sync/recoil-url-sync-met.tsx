import React, { FC } from 'react';
import { RecoilSync, RecoilURLSync, RecoilURLSyncOptions } from 'recoil-sync';
import { useRecoilSyncURL } from './use-recoil-sync-url';
import { tryNumber } from '@hulu/mu';

type Props = Omit<RecoilURLSyncOptions, 'browserInterface' | 'serialize' | 'deserialize'>;

export type Serialize = (data: unknown) => string;
export type Deserialize = (str: string) => unknown;

export const RecoilURLSyncMet: FC<Props> = ({ children, ...options }) => {
    const { browserInterface, ...defaultOptions } = useRecoilSyncURL();
    const props = {
        ...defaultOptions,
        ...options,
        browserInterface,
        serialize: (a: any) => {
            return a?.toString();
        },
        deserialize: (str: string) => {
            return tryNumber(str);
        }
    };
    return <RecoilURLSync {...props}>{children}</RecoilURLSync>;
};
