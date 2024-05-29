export const compilerOptions = [
    {
        label: 'Vite v5',
        value: 'vite',
        hint: '推荐，默认',
        version: '5.1.6',
        dev: 'vite',
        build: 'vite build',
        config: {
            path: '~ass/vite.config.ts',
            target: '../hulu/config.ts',
            omitKeys: []
        }
    },
    { label: 'Umi v4', value: 'umi', version: '4.0.88', config: { path: '../.umirc.ts' } },
    {
        label: 'Dumi v2',
        value: 'dumi',
        version: '2.2.14',
        dev: 'dumi dev',
        build: 'dumi build',
        config: {
            path: '../.dumirc.ts',
            omitKeys: ['plugins', 'resolve', 'compiler', 'build', 'server']
        }
    },
    { label: 'CRA - React create app', value: '5.0.1', config: { path: '../config.ts' } },
    { label: 'Next', value: 'next', version: '14.0.3', config: { path: '../.config.ts' } },
    { label: 'Remix', value: 'remix', version: '2.3.1', config: { path: '../.config.ts' } }
];
