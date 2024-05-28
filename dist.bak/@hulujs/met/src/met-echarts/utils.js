/**
 * 计算echart最终的配置信息
 * - 权重 setting > data > options
 * - options 默认从 chartTypes 中读取
 */
const getOptions = ({ data, chartTypes, mapper, dataModel, setting, options }) => {
    return {
        ...options
    };
};
export {};
