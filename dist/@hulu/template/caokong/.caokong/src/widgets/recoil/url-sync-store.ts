import { urlSyncAtom } from '~ck';

export const mixURLSyncState = urlSyncAtom({ type: 'mix', key: 'mixURLSyncState' });
export const queryURLSyncState = urlSyncAtom({ type: 'query', key: 'queryURLSyncState' });
