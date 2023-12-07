// @ck-ignore

/**
 * 路由配置
 */
const routes = [
    {
        path: '/',
        view: 'home',
        meta: {
            count: 1,
            back: () => {
                console.log('111111');
            }
        }
    },
    {
        path: '/demo',
        view: 'demo',
        children: [
            { path: '/demo/eee/:id', view: 'home' },
            { path: '/demo/ddd/:id?', view: 'home' },
            { path: '/demo/fff/*', view: 'home' }
        ]
    }
];

export default routes;
