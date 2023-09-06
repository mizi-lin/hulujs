import { useLocation, matchRoutes } from 'react-router-dom';
import routes from '~ass/routes';
import { extend } from 'lodash-es';

const useRoute = () => {
    const location = useLocation();
    const matched = matchRoutes(routes, location);
    const metas = matched.map(({ route }) => route.meta ?? {});
    const meta = extend({}, ...metas);
    const matched$filter = matched.filter((route) => location.pathname === route.pathname);
    const { route } = matched$filter.at(-1);
    return { route, meta };
};

export { useRoute };
