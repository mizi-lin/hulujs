/**
 * MetEcharts
 */
export type SubType = `::${string}`;
export type SubTypes = SubType | (SubType | [SubType] | [SubType, Record<string, any>])[];
export type SubTypeScope = 'all' | EchartType;
export type SubTypeScopes = SubTypeScope[];
export type EchartType = 'line' | 'bar' | 'pie' | 'scatter' | 'effectScatter' | 'radar' | 'tree' | 'treemap' | 'sunburst' | 'boxplot' | 'candlestick' | 'heatmap' | 'map' | 'parallel' | 'lines' | 'graph' | 'sankey' | 'funnel' | 'gauge' | 'pictorialBar' | 'themeRiver' | 'custom';
