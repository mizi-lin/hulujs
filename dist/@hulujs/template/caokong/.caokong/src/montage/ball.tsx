import React, { FC } from 'react';
import { FloatButton } from 'antd';
import Icon from '@ant-design/icons';
import HuluSvg from './assets/hulu.svg';

interface BallProps {}
export const Ball: FC<BallProps> = () => {
    return (
        <FloatButton.Group
            trigger="hover"
            type="primary"
            style={{ right: 24 }}
            // icon={<Icon component={HuluSvg} />}
        >
            <FloatButton />
            <FloatButton />
        </FloatButton.Group>
    );
};
