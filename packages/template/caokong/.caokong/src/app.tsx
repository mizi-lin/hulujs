// @ts-nocheck
import routes from '~ass/routes';
import { ConfigProvider, theme } from 'antd';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import zhCN from 'antd/locale/zh_CN';

import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

export function App() {
    return (
        <Fragment>
            <ConfigProvider
                locale={zhCN}
                theme={{ token: { colorPrimary: '#1677ff', borderRadius: 4 } }}
            >
                <RouterProvider
                    router={createBrowserRouter(routes, { basename: import.meta.env.BASE_URL })}
                    fallbackElement={<></>}
                />
            </ConfigProvider>
        </Fragment>
    );
}
