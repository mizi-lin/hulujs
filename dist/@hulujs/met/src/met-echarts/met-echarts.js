import { jsx as _jsx } from "react/jsx-runtime";
import { Met } from '@hulujs/met';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import clx from 'classnames';
import { getOptions } from './options.js';
const MetEcharts = (props) => {
    const { data, dataModel, options, type, subtypes, mappers, setting, className, ...extra } = props;
    const echartRef = useRef(null);
    const [myChart, setMyChart] = useState();
    const [opts, setOpts] = useState();
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
    return _jsx(Met, { tag: 'div', ref: echartRef, className: clx('met-echarts', className), full: true, ...extra });
};
export default MetEcharts;
