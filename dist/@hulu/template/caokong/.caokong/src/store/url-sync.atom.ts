import { atom } from 'recoil';

export const urlSyncAtom = atom<Record<string, any>>({
    key: 'urlSyncAtom',
    default: {}
});
