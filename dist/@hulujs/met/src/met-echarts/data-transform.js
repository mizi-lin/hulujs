import { mapping, mget, upArray } from '@hulujs/mu';
import { groupBy, isNil, uniq } from 'lodash-es';
import { typeDemensionMap } from './constants.js';
// 将 string[] 数据转为 { value: string }[]}, 让之后的数据更方便处理
// OptionDataItemObject
const normalizeOptionDataItemObject = (value) => ({ value });
const transformDemension = {
    one: ({ data, type }) => {
        const ignoreKey = 'undefined';
        // 数据分组
        // 支持多重一维图表
        // 若只是一重一维图表，其返回值是 { 'undefined': [...] }
        // 在数据处理时，需要特别处理
        const dataGroup = groupBy(data, 'd');
        // 计算 series
        const series = Object.keys(dataGroup).map((serieName) => {
            const seriesData = dataGroup[serieName];
            const data = mapping(seriesData, { value: 'y', name: 'x' });
            const name = serieName === ignoreKey ? 'series_0' : serieName;
            return { name, type, data };
        });
        // 一维图的legend指向的是 series.**.data.name
        // '*.data.*.name' 比 '**.data.name' 更准确
        const legendByDataOfSeries = uniq(mget(series, '*.data.*.name')).map((name) => {
            return { name };
        });
        // 获取 多重一维图表的 legend
        // 若 series 只有一重的时候, 不需要计算series.name for legend
        const legendOfSeries = series.length < 2
            ? []
            : Object.keys(dataGroup)
                .filter((item) => item !== ignoreKey)
                .map((name) => {
                return { name };
            });
        return {
            'legend.data': [...legendByDataOfSeries, ...legendOfSeries],
            series: series
        };
    },
    two: ({ data, type }) => {
        /**
         * series 与 data 的关系
         * series 就是 data 基于 name 的 group 信息
         * ---
         * 根据数据类型类型计算 legend 和 series 的配置
         * ---
         * legend 与 series 的关系
         * 若 legend 不配置，则根据 series 的 name 自动生成
         * legend 控制 series 的显示与否
         */
        // 数据分组
        const dataGroup = groupBy(data, 'd');
        // 获取 legend
        const legendData = Object.keys(dataGroup).map((name) => ({ name }));
        // 获取 x 轴
        const xAxisData = Object.keys(groupBy(data, 'x')).map(normalizeOptionDataItemObject);
        // 计算 series
        const series = legendData.map(({ name }) => {
            const seriesData = dataGroup[name];
            return {
                name,
                type,
                data: mapping(seriesData, { value: 'y' })
            };
        });
        return {
            'legend.data': legendData,
            'xAxis.0.data': xAxisData,
            series: series
        };
    }
};
/**
 * 数据处理
 */
export const transformData = ({ data: dataSource, type, mappers, dimension }) => {
    if (isNil(dataSource))
        return {};
    // 数据映射为可使用的数据格式
    const [mapper, mapperType] = upArray(mappers);
    const data = mapping(dataSource, mapper, mapperType);
    // todo 当数据某项缺失时，需要将数据补回，否则画出来的图表会变形
    // 图表与维度映射关系，若存在为映射关系，不存在默认为’二维数组‘
    const dimension$ = dimension ?? typeDemensionMap[type] ?? 'two';
    return transformDemension[dimension$]({ data, type });
};
