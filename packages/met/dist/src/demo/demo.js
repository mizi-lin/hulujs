import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
const Demo = forwardRef((props, ref) => {
    return _jsx("div", { children: props.children });
});
export default Demo;
