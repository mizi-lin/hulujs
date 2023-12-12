/**
 * 数据处理
 */
export declare const transformData: ({ data: dataSource, type, mappers, dataModel }: {
    data: any;
    type: any;
    mappers: any;
    dataModel: any;
}) => {
    'legend.data': {
        name: string;
    }[];
    'xAxis.data': {
        value: string;
    }[];
    series: {
        name: string;
        type: any;
        data: any;
    }[];
};
