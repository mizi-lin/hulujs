export const defaultOptions = {
    /**
     * 饼图
     */
    pie: { legend: {}, tooltip: { trigger: 'item' } },

    /**
     * 柱形图
     */
    bar: {
        grid: { left: 'left', right: 20, bottom: 20, width: '98%', containLabel: true },
        legend: {},
        tooltip: { trigger: 'axis' },
        yAxis: [{}],
        series: [],
        xAxis: [{ type: 'category', boundaryGap: true }]
    },

    /**
     * 极坐标图
     */
    polar: {
        angleAxis: { type: 'value', startAngle: 0 },
        legend: {},
        grid: { left: 'left', right: 20, bottom: 20, width: '98%', containLabel: true },
        radiusAxis: {},
        series: [],
        tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
        polar: { center: ['50%', '54%'] }
    },

    /**
     * 线形图
     */
    line: {
        grid: { left: 'left', right: 20, bottom: 20, width: '95%', containLabel: true },
        legend: {},
        tooltip: { trigger: 'axis' },
        series: [],
        xAxis: [{ type: 'category', boundaryGap: false }],
        yAxis: [{ type: 'value' }]
    },

    /**
     * 散点气泡图
     */
    scatter: {
        grid: { left: 'left', right: 20, bottom: 20, width: '95%', containLabel: true },
        tooltip: {},
        series: [],
        yAxis: [{ type: 'value' }],
        xAxis: [{ type: 'value' }]
    },

    /**
     * 矩形树图
     */
    treemap: {
        legend: void 0,
        series: [],
        'series.*.roam': false,
        'series.*.width': '100%',
        'series.*.height': '100%',
        'series.*.breadcrumb.show': false,
        'series.*.nodeClick': false,
        'series.*.colorAlpha': [0.5, 0.9],
        tooltip: {}
    },

    /**
     * 雷达图
     */
    radar: { legend: {}, tooltip: {}, series: [], radar: { indicator: [] } },

    /**
     * 旭日图
     */
    sunburst: { tooltip: {}, series: [] },

    /**
     * 词云
     */
    wordCloud: { legend: {}, tooltip: {}, series: [] },

    /**
     * 水滴图
     */
    liquidFill: { tooltip: {}, series: [] },

    /**
     * 仪表盘
     */
    gauge: { legend: { show: false }, series: [], tooltip: {} },

    /**
     * 地图
     */
    map: {
        tooltip: {},
        visualMap: { min: 0, max: 200, left: 'left', top: 'bottom', text: ['高', '低'], calculable: false },
        geo: { zoom: 1, roam: false, itemStyle: { areaColor: '#fbfbfb', borderColor: '#b9b4b7' } },
        series: []
    },

    chinaVerticalMap: {
        extends: 'map',
        'series.*.type': 'map',
        'series.*.map': 'chinaVertical',
        'geo.map': 'chinaVertical'
    },

    chinaMap: {
        extends: 'map',
        'series.*.type': 'map',
        'series.*.map': 'china',
        'geo.map': 'china'
    },

    /**
     * 关系图
     */
    graph: { legend: {}, tooltip: {}, series: [], 'series.*.layout': 'force' },

    /**
     * 桑基图
     * x -> source, name -> target
     */
    sankey: { tooltip: {}, series: [] },

    /**
     * 漏斗图
     */
    funnel: { tooltip: {}, series: [] }
};

/**
 * 默认的数据类型
 * 默认数据类型是 two
 */
export const typeDemensionMap = {
    pie: 'one',
    wordCloud: 'one',
    map: 'one',
    chinaVerticalMap: 'one',
    chinaMap: 'one',
    gauge: 'one',
    funnel: 'one',
    liquidFill: 'one',
    graph: 'flatten',
    treemap: 'tree'
};

/**
 * 默认各类型的chart
 */
export const defaultSubtype = {
    bar: '::stack',
    gauge: '::half',
    treemap: '::simple',
    map: '::china'
};
