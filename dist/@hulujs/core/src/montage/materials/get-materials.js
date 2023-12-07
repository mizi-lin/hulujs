/**
 * 获取物料列表
 */
export const getMaterials = function (req, res) {
    /**
     * 获取物料列表
     * - 读取物料文件
     */
    // const {  } = req.query;
    res.send({
        data: [
            {
                name: '趋势图',
                thumalbail: '',
                package: {
                    authors: ['mizi', 'dawa'],
                    package: '@hulujs-material/trend',
                    version: '1.0.0',
                    description: '网格布局（Grid）是最强大的 CSS 布局方案，打包工具的作用是，将多个 JavaScript 脚本合并成一个脚本，供浏览器使用',
                    homepage: '',
                    repository: '',
                    license: 'MIT',
                    dependencies: {
                        '@hulujs/trend': '^1.0.0'
                    },
                    main: 'index.js',
                    files: ['index.js'],
                    updateDate: '2023-01-01T00:00:00+08:00',
                    export: {
                        import: `import TrendChart from '@hulujs-material/trend';`,
                        content: `<TrendChart />`
                    }
                }
            },
            {
                name: '书台菜单',
                package: {
                    description: '是打造一款简单易用的 ES 模块打包工具，不必配置，直接使用。这一点，它确实做到了。 后来经过不断发展，它也可以打包 CommonJS 模块。但是，这时需要经过复杂配置，实际上并没有比 Webpack 简单多少',
                    updateDate: '2023-03-01T00:02:00+08:00'
                }
            },
            {
                name: '手风琴',
                package: {
                    description: '最常用的打包工具是 Webpack。它的功能强大，但是难学难用，一直被人诟病',
                    updateDate: '2023-03-01T00:02:00+08:00'
                }
            },
            {
                name: '自增长表单',
                package: {
                    description: '果有多个入口脚本，就依次填写它们的文件名，并使用参数--dir指定输出目录',
                    updateDate: '2023-06-08T00:02:00+08:00'
                }
            },
            {
                name: '统计型卡片',
                package: {
                    description: '最常用的打包工具是 Webpack。它的功能强大，但是难学难用，一直被人诟病',
                    updateDate: '2003-06-08T00:02:00+08:00'
                }
            },
            {
                name: '下拉卡片',
                package: {
                    description: '最简单的方法就是分析浏览器的 user agent 字符串，它包含了设备信息, 这种方法的优点是简单方便，缺点是不可靠，因为用户可以修改这个字符串，让手机浏览器伪装成桌面浏览器, 注意，苹果的 Safari 浏览器和 Firefox 浏览器都不支持这个属性，具体情况可以查看 Caniuse 网站',
                    updateDate: '2021-02-07T00:02:00+08:00'
                }
            },
            {
                name: '散点式分布图',
                package: {
                    description: '另一种方法是通过屏幕宽度，判断是否为手机',
                    updateDate: '2021-02-07T00:02:00+08:00'
                }
            },
            {
                name: '河流式漏斗图',
                package: {
                    description: '最常用的打包工具是 Webpack。它的功能强大，但是难学难用，一直被人诟病',
                    updateDate: '2021-02-07T00:02:00+08:00'
                }
            }
        ]
    });
};
