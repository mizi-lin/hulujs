export declare const transformTypeBySeries: (type: string) => (({ data, minValue, maxValue, sumValue }: {
    data: any;
    minValue: any;
    maxValue: any;
    sumValue: any;
}) => {
    title: {
        show: boolean;
    };
    detail: {
        show: boolean;
    };
} | {
    data: any;
    tooltip: {
        formatter: any;
    };
    title: {
        show: boolean;
    };
    detail: {
        show: boolean;
    };
}) | undefined;
export declare const transformType: (type: string) => any;
