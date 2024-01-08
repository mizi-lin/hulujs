import { format, withIIFE } from '@hulujs/mu';
export const transformType = (type) => {
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
                        return `${seriesName}<br />${marker} ${name}: ${format(+data.displayValue)} (${format(+data.value, 'toPercent')})`;
                    })
                }
            };
        }
    }[type];
};
