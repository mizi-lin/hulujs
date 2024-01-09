import { format, map, withIIFE } from '@hulujs/mu';
export const transformTypeBySeries = (type) => {
    return {
        gauge: ({ data, minValue, maxValue, sumValue }) => {
            const showTitleOptions = { title: { show: false }, detail: { show: false } };
            if (maxValue <= 100)
                return showTitleOptions;
            if (data.length < 2)
                return showTitleOptions;
            const base = minValue + maxValue;
            const data$ = data.map((item) => {
                return {
                    ...item,
                    value: (item.value / base) * 100,
                    displayValue: item.value
                };
            });
            return {
                ...showTitleOptions,
                data: data$,
                tooltip: {
                    formatter: withIIFE((...args1) => (component) => {
                        const { marker, seriesName, data, name } = component;
                        const name$ = seriesName.startsWith('series') ? '' : `${seriesName} <br />`;
                        return `${name$}${marker} ${name}: ${format(+data.displayValue)} (${format(+data.value, 'toPercent')})`;
                    })
                }
            };
        }
    }[type];
};
export const transformType = (type) => {
    const typeMap = {
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
        radar: ({ xAxisGroup, series }) => {
            const indicator = map(xAxisGroup, (items, name) => {
                const max = Math.max(...items.map(({ value }) => value));
                return { name };
            }, []);
            const series$ = [
                {
                    type: 'radar',
                    data: series.map((item) => {
                        item.value = item.data.map(({ value }) => value);
                        return item;
                    })
                }
            ];
            return { 'radar.indicator': indicator, xAxis: void 0, series: series$ };
        }
    };
    return typeMap[type];
};
