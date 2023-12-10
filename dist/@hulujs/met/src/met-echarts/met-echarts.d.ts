import { MetProps } from '@hulujs/met';
import { DataRow, Mapper, MapperValue } from '@hulujs/types';
import { EChartsOption } from 'echarts';
import { FC } from 'react';
interface MetEchartsDataRow extends DataRow {
    x?: string | number;
    y?: string | number;
    z?: string | number;
    name?: string;
}
interface MetEchartsProps extends MetProps {
    /**
     * DataRow 的数据格式
     * 将data转成echarts的需要格式
     * - 不使用dataset的原因是数据转换的时候不方便
     * - data 转换的权重值大于 options 的权重
     * - setting 的权重大于 data 的权重
     */
    data?: MetEchartsDataRow[];
    /**
     * DataModel 的数据格式
     * 数据会根据不同的数据格式转换成不同的OptionByData
     */
    dataModel?: 'single' | 'multiple';
    /**
     * echarts options
     */
    options?: EChartsOption;
    /**
     * chartTypes
     * 图表类型
     * - 若是string, 多个图表以'::'进行分割,
     * - 若是数组, 数组单项可以为字符转(图表名称),
     * -- 或是类似插件的元组格式 [chartname, options],
     * example:
     * - bar::2y
     * - ['bar', '2y']
     * - ['bar', ['2y', {}]]
     */
    chartTypes?: string | [string, Record<string, any>][];
    /**
     * mapper
     * mapping 方法需要的参数
     */
    mapper?: Mapper | [Mapper, MapperValue];
    /**
     * 配置信息
     * - 该配置信息通过mset对options进行设置
     * - 若有需求非常强烈的顺序要求, 使用数组格式
     */
    setting?: Record<string, any> | Record<string, any>[];
}
declare const MetEcharts: FC<MetEchartsProps>;
export default MetEcharts;
