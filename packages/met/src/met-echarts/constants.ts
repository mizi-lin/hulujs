export const defaultOptions = {
    /**
     * 饼图
     */
    pie: { legend: {}, tooltip: { trigger: 'item' }, series: [] },

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
        grid: { left: 'left', right: 20, bottom: 20, width: '98%', containLabel: true },
        legend: {},
        tooltip: { trigger: 'axis' },
        yAxis: [{}],
        dataset: {},
        xAxis: [{ type: 'category' }]
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
    treemap: { legend: {}, tooltip: {}, series: [] },

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
    liquidFill: { legend: {}, tooltip: {}, series: [] },

    /**
     * 仪表盘
     */
    gauge: { legend: { show: false }, series: [], tooltip: { formatter: '{a} <br/>{b} = {c}%' } },

    /**
     * 地图
     */
    map: {
        tooltip: {},
        visualMap: { min: 0, max: 200, left: 'left', top: 'bottom', text: ['高', '低'], calculable: false },
        geo: { zoom: 1.2, roam: false, itemStyle: { areaColor: '#fbfbfb', borderColor: '#b9b4b7' } },
        series: []
    },

    /**
     * 关系图
     */
    graph: { legend: {}, tooltip: {}, series: [{}] },

    /**
     * 桑基图
     * x -> source, name -> target
     */
    sankey: { tooltip: {}, series: [{}] },

    /**
     * 漏斗图
     */
    funnel: { tooltip: {}, series: [{}] }
};

/**
 * 默认的数据类型
 * 默认数据类型是 two
 */
export const typeDemensionMap = {
    pie: 'one',
    wordCloud: 'one',
    map: 'one',
    graph: 'one',
    scatter: 'one',
    gauge: 'one',
    funnel: 'one'
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
