import { useLocation } from 'react-router';
import { useCallback } from 'react';
import { BrowserInterface, RecoilURLSyncOptions } from 'recoil-sync';

export function useRecoilSyncURL(): Partial<Omit<RecoilURLSyncOptions, 'children'>> {
    const navigate = useNavigate();
    const { pathname, search } = useLocation();

    const browserInterface: BrowserInterface = {
        replaceURL: useCallback(
            (url: string) => {
                const uri = new URL(url);
                const { pathname, search } = uri;
                navigate(`${pathname}${search}`, { replace: true });
            },
            [pathname, search]
        ),

        pushURL: useCallback(
            (url: string) => {
                const uri = new URL(url);
                const { pathname, search } = uri;
                navigate(`${pathname}${search}`, { replace: false });
            },
            [pathname, search]
        ),

        listenChangeURL: useCallback(
            (handler: () => void) => {
                handler();
                return () => {};
            },
            [pathname, search]
        )
    };

    return {
        browserInterface
    };
}
