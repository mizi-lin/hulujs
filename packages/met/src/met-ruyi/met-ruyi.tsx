import { isFalsy, mapping } from '@hulujs/mu';
import { FC, ReactNode, Suspense, useEffect } from 'react';
import { RecoilValue, selectorFamily, useRecoilValueLoadable } from 'recoil';
import { MetError, MetDynamic, MetGene, MetGeneProps, MetLoading, MetNodata, MetProps } from '../index.js';
import { ErrorBoundary } from 'react-error-boundary';
import { Request, RuyiOptions } from '@hulujs/msc';

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
    onErrorReset?: (details) => void;
    // @todo mapper
    // @todo transmit
}

const ruyiSelector$ = selectorFamily<any, Record<string, any>>({
    key: 'RuyiSelector',
    get: (ruyi) => async () => {
        const { method, url, params, payload, options } = ruyi;
        return await Request(method, url, params, payload, options);
    }
});

const MetRuyiInner: FC<MetRuyiProps> = (props) => {
    const {
        method,
        url,
        params,
        payload,
        options,
        selector,
        loading = <MetLoading />,
        error = <>Recoil Error</>,
        nodata = <MetNodata />,
        transmit = { data: 'data' },
        callback,
        children
    } = props;
    const selector$ = selector ?? ruyiSelector$({ method, url, params, payload, options });
    const { state, contents } = useRecoilValueLoadable(selector$!);
    let dominant: Record<string, any> = {};

    useEffect(() => {
        callback?.(dominant);
    }, [callback, dominant]);

    if (state === 'loading' && loading) {
        return <MetDynamic component={loading} />;
    }

    // if (state === 'hasError' && error) {
    //     return <MetDynamic component={error} />;
    // }

    const transmit$ = typeof transmit === 'string' ? (transmit === '@' ? {} : { [transmit]: 'data' }) : transmit;
    dominant = mapping(contents, transmit$, 'mapping');

    if (isFalsy(dominant, true) && nodata) {
        return <MetDynamic component={nodata} />;
    }

    return (
        <MetGene dominant={dominant} bridge={true}>
            {children}
        </MetGene>
    );
};

const MetRuyi: FC<MetRuyiProps> = (props) => {
    const { onErrorReset } = props;

    return (
        <ErrorBoundary FallbackComponent={MetError} onReset={onErrorReset}>
            <MetRuyiInner {...props} />
        </ErrorBoundary>
    );
};

export default MetRuyi;
