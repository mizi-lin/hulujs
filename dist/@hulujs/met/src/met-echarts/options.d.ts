/**
 * 计算echart最终的配置信息
 * - 权重 setting > data > options
 * - options 默认从 chartTypes 中读取
 */
export declare const getOptions: ({ data, type, subtypes, mappers, dataModel, setting, options }: {
    data: any;
    type: any;
    subtypes: any;
    mappers: any;
    dataModel: any;
    setting: any;
    options: any;
}) => any;
