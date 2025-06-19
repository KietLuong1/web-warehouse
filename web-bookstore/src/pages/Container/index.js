import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@mui/material';
import ChipStatus from '../../components/ChipStatus';
import { Toastify } from '../../components/Toastify';
function Container() {
    return (_jsxs("div", { children: [_jsx(ChipStatus, { status: 'Active' }), _jsx(ChipStatus, { status: 'Inactive' }), _jsx(ChipStatus, { status: 'In progress' }), _jsx(ChipStatus, { status: 'Closed' }), _jsx(Button, { variant: 'contained', onClick: () => Toastify('success', 'test'), children: "success" }), _jsx(Button, { variant: 'contained', onClick: () => Toastify('error', 'test'), children: "error" }), _jsx(Button, { variant: 'contained', onClick: () => Toastify('info', 'test'), children: "info" }), _jsx(Button, { variant: 'contained', onClick: () => Toastify('warning', 'test'), children: "warning" }), _jsx(Button, { variant: 'contained', onClick: () => Toastify('default', 'test'), children: "default" })] }));
}
export default Container;
