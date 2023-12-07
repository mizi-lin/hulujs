import { RecoilRoot } from 'recoil';
import { RecoilURLSync } from '~ck';

export const RecoilNestRoot = (props) => {
    return (
        <RecoilRoot>
            <RecoilURLSync>{props.children}</RecoilURLSync>
        </RecoilRoot>
    );
};
