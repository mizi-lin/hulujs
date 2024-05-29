// @ts-nocheck
import { useRecoilURLSync } from '~ck';

const RecoilURLSync = (props) => {
    const done = useRecoilURLSync();
    return done ? <>{props.children}</> : null;
};

export { RecoilURLSync };
