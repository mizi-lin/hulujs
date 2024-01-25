import { MetCenter, MetFlexProps, MetNodata } from '../index.js';
// import { FrownOutlined } from '@ant-design/icons';
import { isDev } from '../env.js';

export interface MetErrorProps extends MetFlexProps {
    error: Error;
    resetErrorBoundary: (...args) => void;
}

const MetError = (props) => {
    const { error, resetErrorBoundary } = props;
    const handleError = () => {
        console.log(error);
    };
    return (
        <MetCenter minHeight={100} maxHeight={300} className={'met-error'}>
            {/* {isDev ? <FrownOutlined onClick={handleError} /> : <MetNodata />} */}
        </MetCenter>
    );
};

export default MetError;
