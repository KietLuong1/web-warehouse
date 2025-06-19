import { jsx as _jsx } from "react/jsx-runtime";
import { Stack, Typography } from '@mui/material';
import { COLOR_CODE } from '../../configs/color';
const EmptyTable = ({ title = 'No records found' }) => (_jsx(Stack, { flexGrow: 1, justifyContent: 'center', alignItems: 'center', my: 2, children: _jsx(Typography, { variant: 'h6', color: COLOR_CODE.GREY_600, fontWeight: 500, textAlign: 'center', children: title }) }));
export default EmptyTable;
