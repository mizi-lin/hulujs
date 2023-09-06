/**
 * 全局重置ErrorBoundary
 */

import { atomFamily } from 'recoil';

const resetGlobalErrorBoundaryAtom = atomFamily({
    key: '',
    default: ''
});

const useResetGlobalErrorBoundary = () => {};

export default useResetGlobalErrorBoundary;
