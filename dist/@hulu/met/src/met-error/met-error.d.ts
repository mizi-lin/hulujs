import { MetFlexProps } from '../index.js';
import './met-error.less';
export interface MetErrorProps extends MetFlexProps {
    error: Error;
    resetErrorBoundary: (...args: any[]) => void;
}
declare const MetError: (props: any) => import("react/jsx-runtime").JSX.Element;
export default MetError;
