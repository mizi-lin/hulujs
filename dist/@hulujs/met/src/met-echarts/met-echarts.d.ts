import { MetProps } from '@hulujs/met';
import { DataRow, EchartType, Mapper, MapperValue, SubTypes } from '@hulujs/types';
import { EChartsOption } from 'echarts';
import { FC } from 'react';
export interface MetEchartsDataRow extends DataRow {
    x?: string | number;
    y?: string | number;
    z?: string | number;
}
export interface MetEchartsProps extends MetProps {
    /**
     * DataRow 的数据格式
     * 将data转成echarts的需要格式
     * - 不使用dataset的原因是数据转换的时候不方便
     * - data 转换的权重值大于 options 的权重
     * - setting 的权重大于 data 的权重
     */
    data?: MetEchartsDataRow[];
    /**
     * DataModel 的数据格式
     * 数据会根据不同的数据格式转换成不同的OptionByData
     */
    dataModel?: 'single' | 'multiple';
    /**
     * echarts options
     */
    options?: EChartsOption;
    /**
     * echarts 图表类型
     */
    type: EchartType;
    /**
     * 预制的setting集合
     * 快速配置图表
     */
    subtyps?: SubTypes;
    /**
     * mapper
     * mapping 方法需要的参数
     */
    mappers?: Mapper | [Mapper, MapperValue];
    /**
     * 配置信息
     * - 该配置信息通过mset对options进行设置
     * - 若有需求非常强烈的顺序要求, 使用数组格式
     */
    setting?: Record<string, any> | Record<string, any>[];
}
declare const MetEcharts: FC<MetEchartsProps>;
export default MetEcharts;
