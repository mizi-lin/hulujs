export declare const transformTypeBySeries: (type: string) => (({ data, minValue, maxValue, sumValue, controlValue }: {
    data: any;
    minValue: any;
    maxValue: any;
    sumValue: any;
    controlValue: any;
}) => {
    title: {
        show: boolean;
    };
    detail: {
        show: boolean;
    };
} | {
    max: number;
    title: {
        show: boolean;
    };
    detail: {
        show: boolean;
    };
}) | (({ data, minValue, maxValue, sumValue, medianValue, controlValue }: {
    data: any;
    minValue: any;
    maxValue: any;
    sumValue: any;
    medianValue: any;
    controlValue: any;
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
    label: {
        formatter: () => string;
        fontSize: number;
    };
    title: {
        show: boolean;
    };
    detail: {
        show: boolean;
    };
}) | undefined;
export declare const transformType: (type: string) => any;
