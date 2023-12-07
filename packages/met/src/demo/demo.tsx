import { FC, PropsWithChildren, forwardRef } from 'react';

interface DemoProps extends PropsWithChildren<any> {}
const Demo: FC<DemoProps> = forwardRef((props, ref) => {
    return <div>{props.children}</div>;
});

export default Demo;
