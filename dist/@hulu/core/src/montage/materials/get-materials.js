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
                    description: '趋势图',
                    homepage: '',
                    repository: '',
                    license: 'MIT',
                    dependencies: {
                        '@hulu/trend': '^1.0.0'
                    },
                    main: 'index.js',
                    files: ['index.js']
                }
            },
            {
                name: '书台菜单'
            },
            {
                name: '手风琴'
            },
            {
                name: '自增长表单'
            },
            {
                name: '统计型卡片'
            },
            {
                name: '下拉卡片'
            },
            {
                name: '散点式分布图'
            },
            {
                name: '河流式漏斗图'
            }
        ]
    });
};
