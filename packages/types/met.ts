/**
 * MetEcharts
 */

// subtype 命名规范
export type SubType = `::${string}`;
// subtypes 明明规则
export type SubTypes = SubType | (SubType | [SubType] | [SubType, Record<string, any>])[];
// 注册subtype的时候的作用域
export type SubTypeScope = 'all' | EchartType;
export type SubTypeScopes = SubTypeScope[];
// Echarts 支持的图表类型
export type EchartType =
    | 'line'
    | 'bar'
    | 'pie'
    | 'scatter'
    | 'effectScatter'
    | 'radar'
    | 'tree'
    | 'treemap'
    | 'sunburst'
    | 'boxplot'
    | 'candlestick'
    | 'heatmap'
    | 'map'
    | 'parallel'
    | 'lines'
    | 'graph'
    | 'sankey'
    | 'funnel'
    | 'gauge'
    | 'pictorialBar'
    | 'themeRiver'
    | 'custom';
