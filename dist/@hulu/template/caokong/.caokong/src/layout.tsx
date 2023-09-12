// @ck-ignore
import { FC, PropsWithChildren, memo } from 'react';

const Layout: FC<PropsWithChildren> = memo(
    (props) => {
        return (
            <>
                <Outlet />
            </>
        );
    },
    () => true
);

export default Layout;
