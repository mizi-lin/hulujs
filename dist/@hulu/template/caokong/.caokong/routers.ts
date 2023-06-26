/**
 * 路由配置
 */
import { RouteObject } from '~hulu/msc';

const routes = [
    {
        path: '/',
        lazy: () => import('@/views/home')
    }
];

export { routes };
