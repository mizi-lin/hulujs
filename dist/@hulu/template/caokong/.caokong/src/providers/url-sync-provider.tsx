import { PropsWithChildren, FC, useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useParams, useQuery, urlSyncAtom } from '~ck';

const UrlSyncProvider: FC<PropsWithChildren> = ({ children }) => {
    const [done, setDone] = useState(false);
    const setUrlSync = useSetRecoilState(urlSyncAtom);
    const params = useParams();
    const [query] = useQuery();

    useEffect(() => {
        setUrlSync({ ...params, ...query, params, query });
        setDone(true);
    }, [Object.values({ ...params, ...query }).join()]);

    return done ? <>{children}</> : <></>;
};

export { UrlSyncProvider };
