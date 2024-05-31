import { Met, MetProps } from '@hulujs/met';
import { DataRow, EchartType, Mapper, MapperValue, SubTypes } from '@hulujs/types';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';

import { FC, useEffect, useRef, useState } from 'react';
import { bind } from 'size-sensor';
import { getOptions } from './options.js';
import { camelCase, cloneDeep } from 'lodash-es';
import { run } from '@hulujs/mu';
import 'echarts-liquidfill';
import 'echarts-wordcloud';
import { chinaGeoJSON } from './assets/china-map.js';
// @ts-ignore
echarts.registerMap('chinaVertical', chinaGeoJSON('vertical'));
// @ts-ignore
echarts.registerMap('china', chinaGeoJSON('horizontal'));

export interface MetEchartsDataRow extends DataRow {
    // 对应x轴上的值
    x?: string | number | number[];
    // 对应y轴上的值
    y?: string | number | number[];
    // 对应dimension上的值
    d?: string | number | number[];
    name?: string;
    // 对应x轴上的显示的值
    x$?: string | number | number[];
    // 对应y轴上的显示的值
    y$?: string | number | number[];
    // 对应dimension上的显示的值
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

const MetEcharts: FC<MetEchartsProps> = (props) => {
    const {
        data,
        dimension,
        options,
        type,
        subtypes,
        mappers,
        setting,
        notMerge,
        fill = 0,
        onClick,
        onDblClick,
        onMouseDown,
        onMouseUp,
        onMouseOver,
        onMouseOut,
        onGlobalOut,
        ...extra
    } = props;
    const funcMap = { onClick, onDblClick, onMouseDown, onMouseUp, onMouseOver, onMouseOut, onGlobalOut };
    const echartRef = useRef<HTMLDivElement>(null);
    const [myChart, setMyChart] = useState<echarts.ECharts>();
    const [opts, setOpts] = useState<EChartsOption>();
    const [size, setSize] = useState<string>();

    const bindResize = (target) => {
        return bind(target, (element) => {
            const width = element!.clientWidth;
            const height = element!.clientHeight;
            setSize(`${width}-${height}`);
        });
    };

    // 初始化 echarts
    useEffect(() => {
        const target = echartRef?.current;
        let unbind;

        if (target) {
            unbind = bindResize(target);
            if (!myChart && !echarts.getInstanceByDom(target)) {
                const myChart = echarts.init(target, {});
                setMyChart(myChart);
                run(opts, (options) => {
                    myChart.setOption(options, false);
                });
            }
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
            // myChart.clear();
            // myChart.resize();
            console.log('oOoo-> ', type, subtypes ?? '', extra.title ?? extra.comment ?? '->', cloneDeep(opts));
            myChart.setOption(opts, notMerge);
        }
    }, [opts]);

    // 计算最终options
    useEffect(() => {
        const opts = getOptions({ data, dimension, type, subtypes, mappers, setting, options, fill });
        setOpts(opts);
    }, [data, dimension, type, subtypes, mappers, setting, options]);

    // resize
    useEffect(() => {
        myChart && size && myChart.resize();
    }, [size]);

    // bind event
    useEffect(() => {
        if (myChart) {
            Object.entries(funcMap).forEach(([key, func]) => {
                const name = camelCase(key.replace(/^on/, ''));
                myChart.off(name);
                myChart.on(name, (e: any) => {
                    func?.(e, props, options);
                });
            });
        }
    }, [myChart, ...Object.values(funcMap)]);

    return <Met tag={'div'} ref={echartRef} componentClassName={'met-echarts'} full {...extra} />;
};

export default MetEcharts;
