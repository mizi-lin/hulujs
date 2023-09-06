// @ck-ignore
import { FC, PropsWithChildren } from 'react';

const Layout: FC<PropsWithChildren> = (props) => {
    return <Outlet />;
};

export default Layout;
