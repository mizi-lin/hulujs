import { Met, MetProps } from '@hulujs/met';
import { DataRow, EchartType, Mapper, MapperValue, SubTypes } from '@hulujs/types';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import { FC, useEffect, useRef, useState } from 'react';
import { bind } from 'size-sensor';
import { getOptions } from './options.js';
import { cloneDeep } from 'lodash-es';

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
    const { data, dataModel, options, type, subtypes, mappers, setting, ...extra } = props;
    const echartRef = useRef<HTMLDivElement>(null);
    const [myChart, setMyChart] = useState<echarts.ECharts>();
    const [opts, setOpts] = useState<EChartsOption>();
    const [size, setSize] = useState<string>();

    // 初始化 echarts
    useEffect(() => {
        const target = echartRef?.current;
        let unbind;
        if (!myChart && target) {
            const myChart = echarts.init(target);
            opts && myChart.setOption(opts);
            unbind = bind(target, (element) => {
                const width = element!.clientWidth;
                const height = element!.clientHeight;
                setSize(`${width}-${height}`);
            });

            setMyChart(myChart);
        }

        return () => {
            if (myChart) {
                myChart.dispose();
                unbind?.();
            }
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
        setOpts(opts);
        console.log('oOoo-> ', cloneDeep(opts));
    }, [data, dataModel, type, subtypes, mappers, setting, options]);

    // resize
    useEffect(() => {
        myChart && size && myChart.resize();
    }, [size]);

    return <Met tag={'div'} ref={echartRef} componentClassName={'met-echarts'} full {...extra} />;
};

export default MetEcharts;
