// @ts-nocheck
import { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';
import { useQuery, useParams, useRoute } from '~ck';
import { isEqual } from 'lodash-es';

const useURLSync = () => {
    return useRecoilCallback(
        ({ set, snapshot }) =>
            (
                query: Record<string, any>,
                params: Record<string, any>,
                meta: Record<string, any>,
                state: Record<string, any>
            ) => {
                const atoms = snapshot.getNodes_UNSTABLE();
                for (const atom of atoms) {
                    const key = atom.key;
                    if (key.startsWith('urlSync::')) {
                        const { contents } = snapshot.getLoadable(atom);
                        // console.log('key -->', key, atom, contents);
                        switch (true) {
                            case key.startsWith('urlSync::query'): {
                                const value = { ...query };
                                // 对比避免多次配置调用
                                !isEqual(contents, value) && set(atom, value);
                                break;
                            }
                            case key.startsWith('urlSync::params'): {
                                const value = { ...params };
                                !isEqual(contents, value) && set(atom, value);
                                break;
                            }
                            case key.startsWith('urlSync::mix'): {
                                const value = { ...params, ...query };
                                !isEqual(contents, value) && set(atom, value);
                                break;
                            }
                            default: {
                                const value = { query, params, meta, state };
                                !isEqual(contents, value) && set(atom, value);
                            }
                        }
                    }
                }

                return true;
            }
    );
};

export const useRecoilURLSync = () => {
    const sync = useURLSync();
    const [query] = useQuery();
    const [params] = useParams();
    const { meta } = useRoute();
    const { state } = useLocation();
    const [done, setDone] = useState(false);

    useEffect(() => {
        setDone(sync(query, params, meta, state));
    }, [query, params, meta, state]);

    return done;
};
