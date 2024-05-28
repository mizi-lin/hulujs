import { format, isFalsy, map, mapping, median, mget, rowsToTree, run, upArray } from '@hulujs/mu';
import { groupBy, isNil, sortBy, sum, uniq } from 'lodash-es';
import { typeDemensionMap } from './constants.js';
import { transformType, transformTypeBySeries } from './type-transform.js';
// 将 string[] 数据转为 { value: string }[]}, 让之后的数据更方便处理
// OptionDataItemObject
const normalizeOptionDataItemObject = (value) => ({ value });
const ignoreKey = 'undefined';
// 计算各个维度的统计值
const calc = (data) => {
    const values = data.map(({ value }) => value);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const sumValue = sum(values);
    const medianValue = median(values);
    const controlValue = maxValue + minValue + medianValue;
    return { maxValue, minValue, sumValue, medianValue, controlValue };
};
// 按维度计算
const transformDimension = {
    one: ({ data, type }) => {
        // 数据分组
        // 支持多重一维图表
        // 若只是一重一维图表，其返回值是 { 'undefined': [...] }
        // 在数据处理时，需要特别处理
        const dataGroup = groupBy(data, 'serie');
        // 系列数
        const seriesLength = Object.keys(dataGroup).length;
        // 计算 series
        const series = Object.keys(dataGroup).map((serieName, inx) => {
            // 系列数据
            const data = dataGroup[serieName];
            // 系列名称处理
            const name = serieName === ignoreKey ? void 0 : serieName;
            // 多重一维图圆心位置计算
            const centerX = (100 * (inx * 2 + 1)) / (seriesLength * 2);
            const center = [format(centerX, 'toPercent'), '50%'];
            const values$calc = calc(data);
            // 按类型特别处理series的值
            const options$type = transformTypeBySeries(type)?.({ data, ...values$calc });
            return { name, type, data, center, ...options$type };
        });
        // 一维图的legend指向的是 series.**.data.name
        // '*.data.*.name' 比 '**.data.name' 更准确
        const legendByDataOfSeries = uniq(mget(series, '*.data.*.name')).map((name) => {
            return { name };
        });
        // 获取 多重一维图表的 legend
        // 若 series 只有一重的时候, 不需要计算series.name for legend
        const legendOfSeries = seriesLength
            ? []
            : Object.keys(dataGroup)
                .filter((item) => item !== ignoreKey)
                .map((name, inx) => {
                return { name };
            });
        const oneSeriesTip = () => {
            return {
                formatter: series.length === 1
                    ? (component) => {
                        const { marker, seriesName, data, name, value } = component;
                        const seriesName$ = seriesName.startsWith('series') ? '' : `${seriesName} <br />`;
                        const marker$ = marker.replace('transparent', '#f0f0f0');
                        const value$ = run(data?.value ?? value, (value) => `: ${format(value)}`, () => '');
                        return `${seriesName$}${marker$} ${name} ${value$}`;
                    }
                    : void 0,
                trigger: isFalsy(legendData) ? `item` : void 0
            };
        };
        const legendData = [...legendByDataOfSeries, ...legendOfSeries];
        const values$ = calc(data);
        const optionsByType = transformType(type)?.({ data, type, dataGroup, series, legendData, ...values$ });
        return {
            'legend.data': legendData,
            series: series,
            tooltip: { ...oneSeriesTip() },
            ...optionsByType
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
        const dataGroup = groupBy(data, 'serie');
        const xAxisGroup = groupBy(data, 'name');
        // 获取 x 轴
        const xAxisData = Object.keys(xAxisGroup).map(normalizeOptionDataItemObject);
        // 计算 series
        const series = Object.keys(dataGroup)
            .map((name) => ({ name }))
            .map(({ name }) => {
            const seriesData = dataGroup[name];
            return {
                type,
                name: name === ignoreKey ? void 0 : name,
                data: seriesData
            };
        });
        // 计算 legend.data
        // echarts 会自动计算 legend, 但赋值legend.data方便配置和修改
        const legendData = uniq(mget(series, '*.name'))
            .map((name) => {
            return { name };
        })
            .filter(({ name }) => name !== ignoreKey);
        const optionsByType = transformType(type)?.({ data, type, xAxisData, xAxisGroup, dataGroup, series, legendData });
        const oneSeriesTip = () => {
            return {
                'tooltip.formatter': series.length === 1 ? '{b}: {c}' : void 0,
                // 计算 tooltip.trigger
                // 根据 legend.data 存在与否，计算tooltip.trigger的内容
                'tooltip.trigger': isFalsy(legendData) ? `item` : void 0
            };
        };
        return {
            'legend.data': legendData,
            'xAxis.0.data': xAxisData,
            series: series,
            ...oneSeriesTip(),
            ...optionsByType
        };
    },
    tree: ({ data, type }) => {
        /**
         * 关系图
         * treemap: 矩形树图
         * sunburst: 旭日图
         * tree: 树图
         * lines: 路径图
         * graph: 关系图
         * sankey: 桑基图
         */
        const data$ = rowsToTree(data);
        const dataGroup = groupBy(data$, 'serie');
        // 计算 series
        const series = Object.keys(dataGroup)
            .map((name) => ({ name }))
            .map(({ name }) => {
            const seriesData = dataGroup[name];
            return {
                type,
                name: name === ignoreKey ? void 0 : name,
                data: seriesData
            };
        });
        const optionsByType = transformType(type)?.({ data, type, dataGroup, series });
        return { series, ...optionsByType };
    },
    flatten: ({ data, type }) => {
        /**
         * 扁平图
         * 单图多legend
         */
        const dataGroup = groupBy(data, 'serie');
        // 计算 series
        const series = [{ type, data }];
        const legendData = Object.keys(dataGroup).map((name) => {
            return { name };
        });
        const optionsByType = transformType(type)?.({ data, type, legendData, dataGroup, series });
        return { series, 'legend.data': legendData, ...optionsByType };
    }
};
/**
 * 补齐row的项目
 * @param data
 * @param fillData
 */
const fillRowItem = (data, fillData = 0) => {
    if (isNil(data))
        return data;
    if (!Array.isArray(data))
        return data;
    const keys = map(data, Object.keys);
    const keys$flat = keys.flat(Infinity);
    const keys$uniq = uniq(keys$flat);
    const temp = map(keys$uniq, (key) => ({ '::key': key, '::value': fillData }), {});
    return data.map((item) => {
        return { ...temp, ...item };
    });
};
/**
 * 补充缺失的行数据
 * @param data
 * @param groupKey
 * @param fillKey
 */
const fillData = (data, groupKey, fillKey, fill = 0) => {
    // 获取对比项的key
    const fills = mget(data, `*.${fillKey}`);
    // 去重并排序
    const fills$uniq = sortBy(uniq(fills));
    // 分组
    const groups = groupBy(data, groupKey);
    // 补充分组缺少项
    const groups$fill = map(groups, (items, key) => {
        return fills$uniq.map((value) => {
            return items.find((item) => item[fillKey] === value) ?? { [groupKey]: key, [fillKey]: value };
        });
    });
    // 数据还原
    const reorigin = Object.values(groups$fill).flat(Infinity);
    // 数据补0
    return fillRowItem(reorigin, fill);
};
/**
 * 数据处理
 */
export const transformData = ({ data: dataSource, type, mappers, dimension, fill }) => {
    if (isNil(dataSource))
        return {};
    // 数据映射为可使用的数据格式
    const [mapper, mapperType] = upArray(mappers);
    // 根据输入计算mapper数据
    const data$mapper = mapping(dataSource, mapper, mapperType);
    // 数据维护，写入 name 与 value 值
    const data$nv = mapping(data$mapper, { name: 'x', value: 'y', serie: 'd' });
    // 数据补0
    // 关系型数据不补0
    const data = ['graph', 'treemap'].includes(type) ? data$nv : fillData(data$nv, 'serie', 'name', fill);
    // 图表与维度映射关系，若存在为映射关系，不存在默认为’二维数组‘
    const dimension$ = dimension ?? typeDemensionMap[type] ?? 'two';
    // 根据纬度计算数据
    return transformDimension[dimension$]({ data, type });
};
// name, value, demension
