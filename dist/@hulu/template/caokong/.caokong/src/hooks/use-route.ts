import { useLocation, matchRoutes, useMatch } from 'react-router-dom';
import routes from '~ass/routes';
import { extend } from 'lodash-es';
import { iffalsy } from '@hulu/mu';

const useRoute = () => {
    const location = useLocation();
    const matched = matchRoutes(routes, location);
    const metas = matched.map(({ route }) => route.meta ?? {});
    const meta = extend({}, ...metas);
    const matched$filter = matched.filter((route) => location.pathname === route.pathnameBase);
    const { route } = iffalsy(matched$filter, matched).at(-1);
    return { route, meta };
};

export { useRoute };
