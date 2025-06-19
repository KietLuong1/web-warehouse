import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
export default function CustomInput(props) {
    return (_jsxs(Box, { children: [_jsx("label", { style: { fontWeight: 'bold' }, htmlFor: props.id, children: props.title }), _jsx(TextField, { fullWidth: true, margin: 'dense', size: 'small', id: props.id, name: props.name, value: props.value, onChange: props.onChange, disabled: props.dis, required: props.req, type: props.type, InputProps: props.InputProps, select: props.select, children: props.content })] }));
}
