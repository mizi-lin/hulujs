import { isFalsy, mapping } from '@hulu/mu';
import { FC, ReactNode, Suspense } from 'react';
import { RecoilValue, useRecoilValueLoadable } from 'recoil';
import { MetError, MetDynamic, MetGene, MetGeneProps, MetLoading, MetNodata } from '../index.js';
import { ErrorBoundary } from 'react-error-boundary';

export type Transmit = '@' | string | Record<string, string>;

export interface MetRuyiProps extends MetGeneProps {
    url?: string;
    method?: string;
    params?: Record<string, any>;
    payload?: Record<string, any>;
    selector?: RecoilValue<any>;
    nodata?: false | ReactNode;
    loading?: false | ReactNode;
    error?: false | ReactNode | (() => ReactNode);
    transmit?: Transmit;
    onErrorReset?: (details) => void;
    // @todo mapper
    // @todo transmit
}

const MetRuyiInner: FC<MetRuyiProps> = (props) => {
    const {
        selector,
        loading = <MetLoading />,
        error = <>Recoil Error</>,
        nodata = <MetNodata />,
        transmit = { data: 'data' },
        children
    } = props;
    const selector$ = selector;
    const { state, contents } = useRecoilValueLoadable(selector$!);

    if (state === 'loading' && loading) {
        return <MetDynamic component={loading} />;
    }

    // if (state === 'hasError' && error) {
    //     return <MetDynamic component={error} />;
    // }

    const transmit$ =
        typeof transmit === 'string' ? (transmit === '@' ? {} : { [transmit]: 'data' }) : transmit;
    const dominant = mapping(contents, transmit$, 'mapping');

    if (isFalsy(dominant, true) && nodata) {
        return <MetDynamic component={nodata} />;
    }

    return <MetGene dominant={dominant}>{children}</MetGene>;
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
