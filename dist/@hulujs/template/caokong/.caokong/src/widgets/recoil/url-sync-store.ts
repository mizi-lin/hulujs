import { urlSyncAtom } from '~ck';

export const mixURLSyncState = urlSyncAtom<Record<string, any>>({ type: 'mix', key: 'mixURLSyncState' });
export const queryURLSyncState = urlSyncAtom<Record<string, any>>({ type: 'query', key: 'queryURLSyncState' });

interface AllURLSyncStateResult {
    params: Record<string, any>,
    mata: Record<string, any>,
    query: Record<string, any>,
    state: Record<string, any>,
}
export const allURLSyncState = urlSyncAtom<AllURLSyncStateResult>({  key: 'allURLSyncState' });
