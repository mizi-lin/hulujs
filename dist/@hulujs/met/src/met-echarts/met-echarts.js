import { jsx as _jsx } from "react/jsx-runtime";
import { Met } from '@hulujs/met';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
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
const MetEcharts = (props) => {
    const { data, dimension, options, type, subtypes, mappers, setting, notMerge, fill = 0, onClick, onDblClick, onMouseDown, onMouseUp, onMouseOver, onMouseOut, onGlobalOut, ...extra } = props;
    const funcMap = { onClick, onDblClick, onMouseDown, onMouseUp, onMouseOver, onMouseOut, onGlobalOut };
    const echartRef = useRef(null);
    const [myChart, setMyChart] = useState();
    const [opts, setOpts] = useState();
    const [size, setSize] = useState();
    const bindResize = (target) => {
        return bind(target, (element) => {
            const width = element.clientWidth;
            const height = element.clientHeight;
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
                myChart.on(name, (e) => {
                    func?.(e, props, options);
                });
            });
        }
    }, [myChart, ...Object.values(funcMap)]);
    return _jsx(Met, { tag: 'div', ref: echartRef, componentClassName: 'met-echarts', full: true, ...extra });
};
export default MetEcharts;
