import { jsx as _jsx } from "react/jsx-runtime";
import { Met } from '@hulujs/met';
import { useRef } from 'react';
import clx from 'classnames';
const MetEcharts = (props) => {
    const { data, dataModel, options, chartTypes, mapper, setting, className, ...metProps } = props;
    const echartRef = useRef(null);
    return (_jsx(Met, { tag: 'div', ref: echartRef, className: clx('met-echarts', className), ...metProps }));
};
export default MetEcharts;
