import { jsx as _jsx } from "react/jsx-runtime";
import { Met } from '@hulujs/met';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import { bind } from 'size-sensor';
import { getOptions } from './options.js';
import { cloneDeep } from 'lodash-es';
const MetEcharts = (props) => {
    const { data, dataModel, options, type, subtypes, mappers, setting, ...extra } = props;
    const echartRef = useRef(null);
    const [myChart, setMyChart] = useState();
    const [opts, setOpts] = useState();
    const [size, setSize] = useState();
    // 初始化 echarts
    useEffect(() => {
        const target = echartRef?.current;
        let unbind;
        if (!myChart && target) {
            const myChart = echarts.init(target);
            opts && myChart.setOption(opts);
            unbind = bind(target, (element) => {
                const width = element.clientWidth;
                const height = element.clientHeight;
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
    return _jsx(Met, { tag: 'div', ref: echartRef, componentClassName: 'met-echarts', full: true, ...extra });
};
export default MetEcharts;
