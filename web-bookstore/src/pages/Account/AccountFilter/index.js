import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Container, Grid, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { COLOR_CODE } from '../../../configs/color';
const AccountFilter = () => {
    //example of using select component
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const [searchParams, setSearchParams] = useSearchParams();
    const currentSearchParams = Object.fromEntries([...searchParams]);
    const handleClearAll = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { industryIds, accountIds, sectorIds, ...restSearchParams } = currentSearchParams;
        setSearchParams(restSearchParams);
    };
    //   const onFilter = (name: string, value: Array<any> = []) => {
    //     if (isEmpty(value)) {
    //       const { [name]: _, ...restParams } = currentSearchParams
    //       setSearchParams(restParams)
    //       return
    //     }
    //     setSearchParams({ ...currentSearchParams, [name]: value?.join(',') })
    //   }
    return (_jsxs(Container, { maxWidth: 'xs', sx: { p: 2, width: 340 }, children: [_jsxs(Stack, { direction: 'row', alignItems: 'center', mb: 2, justifyContent: 'space-between', children: [_jsx(Typography, { variant: 'h5', mr: 3, color: COLOR_CODE.HEADER, children: "Filter" }), _jsx(Button, { type: 'button', onClick: handleClearAll, style: { fontWeight: 500 }, children: "Clear All" })] }), _jsx(Grid, { container: true, spacing: 2, children: _jsxs(Grid, { item: true, xs: 12, children: [_jsx(InputLabel, { id: 'demo-simple-select-label', children: "User Id" }), _jsxs(Select, { labelId: 'demo-simple-select-label', id: 'demo-simple-select', value: age, label: 'Quantity', size: 'small', fullWidth: true, onChange: handleChange, children: [_jsx(MenuItem, { value: 10, children: "10" }), _jsx(MenuItem, { value: 20, children: "20" }), _jsx(MenuItem, { value: 50, children: "50" }), _jsx(MenuItem, { value: 100, children: "100" }), _jsx(MenuItem, { value: 200, children: "200" })] })] }) })] }));
};
export default AccountFilter;
