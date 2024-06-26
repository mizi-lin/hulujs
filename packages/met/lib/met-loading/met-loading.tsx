import { FC, ReactNode } from 'react';
import { MetCenter, MetCenterProps, MetDynamic } from '../index.js';
// import { Spin } from 'antd';

export interface MetLoadingProps extends MetCenterProps {
    component?: ReactNode;
}

// @todo loading
const Spin = () => {
    return <></>;
};

/**
 * @todo 父元素过高的时候，显示区域设置
 * @todo 父元素无高度的时，高度配置
 */
const MetLoading: FC<MetLoadingProps> = (props) => {
    const { component = <Spin />, ...extra } = props;
    return (
        <MetCenter h={'100%'} w={'100%'} {...extra}>
            <MetDynamic component={component} />
            {props?.children}
        </MetCenter>
    );
};

export default MetLoading;
