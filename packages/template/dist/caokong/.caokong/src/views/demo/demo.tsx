import React, { FC } from 'react';
import { Outlet } from 'react-router';

interface DemoProps {}

const Demo: FC<DemoProps> = () => {
    return (
        <div>
            demo <Outlet />
        </div>
    );
};

export default Demo;
