import { map, tryNumber } from '@hulu/mu';
import { useParams as _useParams, useLocation, useNavigate, generatePath } from 'react-router-dom';
import { useRoute } from '~ck';

const useParams = (isTryNumber: boolean = true) => {
    const params = _useParams();
    const { search, state } = useLocation();
    const navigate = useNavigate();
    const { route } = useRoute();
    const params$ = map(params, (value) => {
        return isTryNumber ? tryNumber(value) : value;
    });

    const setParams = (params: Record<string, any>) => {
        const { path } = route;
        const pathname = generatePath(path, { ...params$, ...params });
        navigate(`${pathname}${search}`, { state });
    };

    return [params$, setParams];
};

export { useParams };
