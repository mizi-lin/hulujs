export declare const defaultOptions: {
    /**
     * 饼图
     */
    pie: {
        legend: {};
        tooltip: {
            trigger: string;
        };
        series: never[];
    };
    /**
     * 柱形图
     */
    bar: {
        grid: {
            left: string;
            right: number;
            bottom: number;
            width: string;
            containLabel: boolean;
        };
        legend: {};
        tooltip: {
            trigger: string;
        };
        yAxis: {}[];
        series: never[];
        xAxis: {
            type: string;
            boundaryGap: boolean;
        }[];
    };
    /**
     * 极坐标图
     */
    polar: {
        grid: {
            left: string;
            right: number;
            bottom: number;
            width: string;
            containLabel: boolean;
        };
        legend: {};
        tooltip: {
            trigger: string;
        };
        yAxis: {}[];
        dataset: {};
        xAxis: {
            type: string;
        }[];
    };
    /**
     * 线形图
     */
    line: {
        grid: {
            left: string;
            right: number;
            bottom: number;
            width: string;
            containLabel: boolean;
        };
        legend: {};
        tooltip: {
            trigger: string;
        };
        series: never[];
        xAxis: {
            type: string;
            boundaryGap: boolean;
        }[];
        yAxis: {
            type: string;
        }[];
    };
    /**
     * 散点气泡图
     */
    scatter: {
        grid: {
            left: string;
            right: number;
            bottom: number;
            width: string;
            containLabel: boolean;
        };
        tooltip: {};
        series: never[];
        yAxis: {
            type: string;
        }[];
        xAxis: {
            type: string;
        }[];
    };
    /**
     * 矩形树图
     */
    treemap: {
        legend: {};
        tooltip: {};
        series: never[];
    };
    /**
     * 雷达图
     */
    radar: {
        legend: {};
        tooltip: {};
        series: never[];
        radar: {
            indicator: never[];
        };
    };
    /**
     * 旭日图
     */
    sunburst: {
        tooltip: {};
        series: never[];
    };
    /**
     * 词云
     */
    wordCloud: {
        legend: {};
        tooltip: {};
        series: never[];
    };
    /**
     * 水滴图
     */
    liquidFill: {
        legend: {};
        tooltip: {};
        series: never[];
    };
    /**
     * 仪表盘
     */
    gauge: {
        legend: {
            show: boolean;
        };
        series: never[];
        tooltip: {
            formatter: string;
        };
    };
    /**
     * 地图
     */
    map: {
        tooltip: {};
        visualMap: {
            min: number;
            max: number;
            left: string;
            top: string;
            text: string[];
            calculable: boolean;
        };
        geo: {
            zoom: number;
            roam: boolean;
            itemStyle: {
                areaColor: string;
                borderColor: string;
            };
        };
        series: never[];
    };
    /**
     * 关系图
     */
    graph: {
        legend: {};
        tooltip: {};
        series: {}[];
    };
    /**
     * 桑基图
     * x -> source, name -> target
     */
    sankey: {
        tooltip: {};
        series: {}[];
    };
    /**
     * 漏斗图
     */
    funnel: {
        tooltip: {};
        series: {}[];
    };
};
/**
 * 默认的数据类型
 * 默认数据类型是 two
 */
export declare const typeDemensionMap: {
    pie: string;
    wordCloud: string;
    map: string;
    graph: string;
    scatter: string;
    gauge: string;
    funnel: string;
};
/**
 * 默认各类型的chart
 */
export declare const defaultSubtype: {
    bar: string;
    gauge: string;
    treemap: string;
    map: string;
};
