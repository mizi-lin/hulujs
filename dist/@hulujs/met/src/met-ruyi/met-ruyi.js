import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { isFalsy, mapping } from '@hulujs/mu';
import { useEffect } from 'react';
import { selectorFamily, useRecoilValueLoadable } from 'recoil';
import { MetError, MetDynamic, MetGene, MetLoading, MetNodata } from '../index.js';
import { ErrorBoundary } from 'react-error-boundary';
import { Request } from '@hulujs/msc';
const ruyiSelector$ = selectorFamily({
    key: 'RuyiSelector',
    get: (ruyi) => async () => {
        const { method, url, params, payload, options } = ruyi;
        return await Request(method, url, params, payload, options);
    }
});
const MetRuyiInner = (props) => {
    const { method, url, params, payload, options, selector, loading = _jsx(MetLoading, {}), error = _jsx(_Fragment, { children: "Recoil Error" }), nodata = _jsx(MetNodata, {}), transmit = { data: 'data' }, callback, children } = props;
    const selector$ = selector ?? ruyiSelector$({ method, url, params, payload, options });
    const { state, contents } = useRecoilValueLoadable(selector$);
    let dominant = {};
    useEffect(() => {
        callback?.(dominant);
    }, [callback, dominant]);
    if (state === 'loading' && loading) {
        return _jsx(MetDynamic, { component: loading });
    }
    // if (state === 'hasError' && error) {
    //     return <MetDynamic component={error} />;
    // }
    const transmit$ = typeof transmit === 'string' ? (transmit === '@' ? {} : { [transmit]: 'data' }) : transmit;
    dominant = mapping(contents, transmit$, 'mapping');
    if (isFalsy(dominant, true) && nodata) {
        return _jsx(MetDynamic, { component: nodata });
    }
    return (_jsx(MetGene, { dominant: dominant, bridge: true, children: children }));
};
const MetRuyi = (props) => {
    const { onErrorReset } = props;
    return (_jsx(ErrorBoundary, { FallbackComponent: MetError, onReset: onErrorReset, children: _jsx(MetRuyiInner, { ...props }) }));
};
export default MetRuyi;
