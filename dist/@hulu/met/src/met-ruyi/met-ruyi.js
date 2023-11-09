import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { isFalsy, mapping } from '@hulu/mu';
import { useRecoilValueLoadable } from 'recoil';
import { MetError, MetDynamic, MetGene, MetLoading, MetNodata } from '../index.js';
import { ErrorBoundary } from 'react-error-boundary';
const MetRuyiInner = (props) => {
    const { selector, loading = _jsx(MetLoading, {}), error = _jsx(_Fragment, { children: "Recoil Error" }), nodata = _jsx(MetNodata, {}), transmit = { data: 'data' }, children } = props;
    const selector$ = selector;
    const { state, contents } = useRecoilValueLoadable(selector$);
    if (state === 'loading' && loading) {
        return _jsx(MetDynamic, { component: loading });
    }
    // if (state === 'hasError' && error) {
    //     return <MetDynamic component={error} />;
    // }
    const transmit$ = typeof transmit === 'string' ? (transmit === '@' ? {} : { [transmit]: 'data' }) : transmit;
    const dominant = mapping(contents, transmit$, 'mapping');
    if (isFalsy(dominant, true) && nodata) {
        return _jsx(MetDynamic, { component: nodata });
    }
    return _jsx(MetGene, { dominant: dominant, children: children });
};
const MetRuyi = (props) => {
    const { onErrorReset } = props;
    return (_jsx(ErrorBoundary, { FallbackComponent: MetError, onReset: onErrorReset, children: _jsx(MetRuyiInner, { ...props }) }));
};
export default MetRuyi;
