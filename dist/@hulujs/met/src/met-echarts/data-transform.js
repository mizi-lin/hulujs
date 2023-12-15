import { mapping, upArray } from '@hulujs/mu';
import { groupBy } from 'lodash-es';
// 将 string[] 数据转为 { value: string }[]}, 让之后的数据更方便处理
// OptionDataItemObject
const normalizeOptionDataItemObject = (value) => ({ value });
/**
 * 数据处理
 */
export const transformData = ({ data: dataSource, type, mappers, dataModel }) => {
    // 数据映射为可使用的数据格式
    const [mapper, mapperType] = upArray(mappers);
    const data = mapping(dataSource, mapper, mapperType);
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
    const dataGroup = groupBy(data, 'z');
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
};
