/**
 * 路由配置
 */
const routes = [
    {
        path: '/',
        lazy: () => import('@/views/home')
    }
];

export { routes };
