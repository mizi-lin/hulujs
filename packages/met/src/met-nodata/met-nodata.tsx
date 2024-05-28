import { FC, ReactNode } from 'react';
import { MetCenter, MetDynamic, MetFlexProps } from '../index.js';
// import { Empty } from 'antd';

export interface MetNodataProps extends MetFlexProps {
    component?: ReactNode;
    image?: string;
    description?: ReactNode;
}

/**
 * @todo 父元素过高的时候，显示区域设置
 * @todo 父元素无高度的时，高度配置
 * @todo nodata, loading component 可以全局配置
 */
const MetNodata: FC<MetNodataProps> = (props) => {
    // @todo Empty
    const {
        description = <></>,
        // image = Empty.PRESENTED_IMAGE_SIMPLE,
        // component = <Empty image={image} description={description} />,
        image = <></>,
        component = <></>,
        ...extra
    } = props;
    return (
        <MetCenter h={'100%'} w={'100%'} {...extra}>
            <MetDynamic component={component} />
            {props?.children}
        </MetCenter>
    );
};

export default MetNodata;
