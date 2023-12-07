import { useSearchParams } from 'react-router-dom';
import { tryNumber } from '@hulu/mu';
import { omit } from 'lodash-es';

type SetQuery = (query: Record<string, any>, extend?: boolean | string[]) => void;

const useQuery = (isTryNumber = true): [Record<string, any>, SetQuery] => {
    const [usp, setUsp] = useSearchParams();
    const query: Record<string, any> = {};
    for (let [key, value] of usp.entries()) {
        value = decodeURIComponent(value);
        isTryNumber && (value = tryNumber(value));
        query[key] = value;
    }

    const setQuery = (record: Record<string, any>, extend: boolean | string[]) => {
        const isExtend = !!extend;
        const omitKeys = Array.isArray(extend) ? extend : [];
        return setUsp(isExtend ? omit({ ...query, ...record }, omitKeys) : record);
    };

    return [query, setQuery as SetQuery];
};

export { useQuery };
