import { MetProps } from '@hulujs/met';
import { DataRow, EchartType, Mapper, MapperValue, SubTypes } from '@hulujs/types';
import { EChartsOption } from 'echarts';
import { FC } from 'react';
import 'echarts-liquidfill';
import 'echarts-wordcloud';
export interface MetEchartsDataRow extends DataRow {
    x?: string | number | number[];
    y?: string | number | number[];
    d?: string | number | number[];
    name?: string;
    x$?: string | number | number[];
    y$?: string | number | number[];
    d$?: string | number | number[];
}
export type MetEchartsEventFunction = (event: any, props: Partial<MetEchartsProps>, options?: EChartsOption) => void;
export interface MetEchartsProps extends Omit<MetProps, 'onClick'> {
    /**
     * DataRow 的数据格式
     * 将data转成echarts的需要格式
     * - 不使用dataset的原因是数据转换的时候不方便
     * - data 转换的权重值大于 options 的权重
     * - setting 的权重大于 data 的权重
     */
    data?: MetEchartsDataRow[];
    /**
     * 图表维度
     * 数据会根据不同的维度转换成不同的 optionByDimension
     */
    dimension?: 'one' | 'two' | 'three';
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
    /**
     * notMerge
     * - 不建议使用
     * options 的某一层级的值设置为 undefined 返回默认值，
     * 但 echert v5.4.3 依然不能判断识别其本质是删除组件，而notMerge不能正常工作，
     * 而 replaceMerge 需要自动计算
     */
    notMerge?: boolean;
    /**
     * 数据补0
     */
    fill?: any;
    onClick?: MetEchartsEventFunction;
    onDblClick?: MetEchartsEventFunction;
    onMouseDown?: MetEchartsEventFunction;
    onMouseUp?: MetEchartsEventFunction;
    onMouseOver?: MetEchartsEventFunction;
    onMouseOut?: MetEchartsEventFunction;
    onGlobalOut?: MetEchartsEventFunction;
}
declare const MetEcharts: FC<MetEchartsProps>;
export default MetEcharts;
