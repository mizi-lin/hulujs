import { Met, MetProps } from '@hulujs/met';
import { DataRow, EchartType, Mapper, MapperValue, SubTypes } from '@hulujs/types';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import { FC, useEffect, useRef, useState } from 'react';
import clx from 'classnames';
import { getOptions } from './options.js';

export interface MetEchartsDataRow extends DataRow {
    // 对应x轴上的值
    x?: string | number;
    // 对应y轴上的值
    y?: string | number;
    // 对应dimension上的值
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

const MetEcharts: FC<MetEchartsProps> = (props) => {
    const { data, dataModel, options, type, subtypes, mappers, setting, className, ...extra } = props;
    const echartRef = useRef<HTMLDivElement>(null);
    const [myChart, setMyChart] = useState<echarts.ECharts>();
    const [opts, setOpts] = useState<EChartsOption>();

    // 初始化 echarts
    useEffect(() => {
        if (!myChart && echartRef?.current) {
            const myChart = echarts.init(echartRef.current);
            opts && myChart.setOption(opts);
            setMyChart(myChart);
        }

        return () => {
            myChart && myChart.dispose();
        };
    }, [echartRef?.current]);

    // 设置options
    useEffect(() => {
        if (myChart && opts) {
            // @todos 计算两次options的区别，动态添加
            myChart.setOption(opts);
        }
    }, [opts]);

    // 计算最终options
    useEffect(() => {
        const opts = getOptions({ data, dataModel, type, subtypes, mappers, setting, options });
        console.log('oOoo-> ', opts);
        setOpts(opts);
    }, [data, dataModel, type, subtypes, mappers, setting, options]);

    return <Met tag={'div'} ref={echartRef} className={clx('met-echarts', className)} full {...extra} />;
};

export default MetEcharts;
