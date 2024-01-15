import { format, map, withIIFE } from '@hulujs/mu';
import { ceil, maxBy } from 'lodash-es';
export const transformTypeBySeries = (type) => {
    return {
        gauge: ({ data, minValue, maxValue, sumValue, controlValue }) => {
            const showTitleOptions = { title: { show: false }, detail: { show: false } };
            if (maxValue <= 100)
                return showTitleOptions;
            if (data.length < 2)
                return showTitleOptions;
            // 进位为100的倍数，避免仪表盘分割时出现小数点的情况
            const base = ceil(minValue + maxValue, -2);
            return {
                ...showTitleOptions,
                max: base
            };
        },
        liquidFill: ({ data, minValue, maxValue, sumValue, medianValue, controlValue }) => {
            const showTitleOptions = { title: { show: false }, detail: { show: false } };
            if (maxValue <= 1)
                return showTitleOptions;
            if (data.length < 2)
                return showTitleOptions;
            const data$ = data.map((item) => {
                return {
                    ...item,
                    value: item.value / (item.control ?? controlValue),
                    y$: item.value
                };
            });
            const maxItem = maxBy(data$, 'value');
            return {
                ...showTitleOptions,
                data: data$,
                tooltip: {
                    formatter: withIIFE((...args1) => (component) => {
                        const { marker, seriesName, data, name } = component;
                        const name$ = seriesName.startsWith('series') ? '' : `${seriesName} <br />`;
                        return `${name$}${marker} ${name}: ${format(+data.y$)} (${format(+data.value, 'percent')})`;
                    })
                },
                label: {
                    formatter: function () {
                        // const maxValue = format(maxItem.value, 'percent');
                        const maxValue = format(+(maxItem.y$ ?? 0));
                        return `${format(maxValue)}\n\n${maxItem.x}`;
                    },
                    fontSize: 20
                }
            };
        }
    }[type];
};
export const transformType = (type) => {
    const typeMap = {
        liquidFill: () => {
            // 水滴球
            // https://github.com/ecomfe/echarts-liquidfill
            return { legend: void 0 };
        },
        radar: ({ xAxisGroup, series }) => {
            const indicator = map(Object.keys(xAxisGroup), (name) => {
                return { name };
            });
            const series$ = [
                {
                    type: 'radar',
                    data: series.map((item) => {
                        item.name = item.name ?? '-';
                        item.value = item.data.map(({ value }) => value);
                        return item;
                    })
                }
            ];
            return {
                'radar.indicator': indicator,
                xAxis: void 0,
                series: series$,
                tooltip: {}
                // 'tooltip.formatter': void 0
            };
        },
        polar: (params) => {
            const { xAxisData } = params;
            return {
                xAxis: void 0,
                yAxis: void 0,
                angleAxis: { type: 'category', data: xAxisData },
                'series.*.coordinateSystem': 'polar',
                'series.*.type': 'line',
                'series.*.smooth': true
            };
        },
        wordCloud: (params) => {
            const { series } = params;
            const legendData = series.map(({ name }) => name);
            const length = series.length;
            const series$ = series.map((item, inx) => {
                return {
                    ...item,
                    width: format(1 / length, 'percent'),
                    left: format(inx / length, 'percent'),
                    top: 'center',
                    center: void 0
                };
            });
            return {
                'legend.data': legendData,
                xAxis: void 0,
                series: series$
            };
        },
        chinaVerticalMap: ({ minValue, maxValue }) => {
            return {
                xAxis: void 0,
                legend: void 0,
                'series.*.center': void 0,
                'visualMap.min': minValue,
                'visualMap.max': maxValue
            };
        },
        chinaMap: ({ minValue, maxValue }) => {
            return {
                xAxis: void 0,
                legend: void 0,
                'series.*.center': void 0,
                'visualMap.min': minValue,
                'visualMap.max': maxValue
            };
        },
        map: ({ minValue, maxValue }) => {
            return {
                xAxis: void 0,
                legend: void 0,
                'series.*.center': void 0,
                'visualMap.min': minValue,
                'visualMap.max': maxValue
            };
        }
    };
    return typeMap[type];
};
