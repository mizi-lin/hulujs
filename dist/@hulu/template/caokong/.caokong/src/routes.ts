// @ck-ignore

/**
 * 路由配置
 */
const routes = [
    {
        path: '/',
        view: 'home',
        count: 1,
        meta: {
            count: 1,
            back: () => {
                console.log('111111');
            }
        },
        children: [{ path: '/', view: 'demo' }]
    },
    { path: '/demo', view: 'demo' }
];

export default routes;
