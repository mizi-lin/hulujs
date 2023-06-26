import { Fragment, RouterProvider, dayjs, createBrowserRouter } from '~hulu/msc';
import { routes } from '~ck';

import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';

import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

export function App() {
    return (
        <Fragment>
            <ConfigProvider locale={zhCN} theme={{ token: { colorPrimary: '#1677ff', borderRadius: 4 } }}>
                <RouterProvider router={createBrowserRouter(routes)} fallbackElement={<></>} />
            </ConfigProvider>
        </Fragment>
    );
}

