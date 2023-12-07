import { SerializableParam, atom, selectorFamily, RecoilState, AtomOptions } from 'recoil';

interface URLSyncOptions<T> extends Omit<AtomOptions<T>, 'default'> {
    type?: 'query' | 'params' | 'mix' | 'remix';
}

export function urlSyncAtom<T>(options: URLSyncOptions<T>): RecoilState<T> {
    const { key, type, ...extra } = options;
    const baseAtom: RecoilState<T> = atom<T>({
        ...extra,
        key: `urlSync::${type}_${key}`,
        default: undefined
    });

    return baseAtom;
}
