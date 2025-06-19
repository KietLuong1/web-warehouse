import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SearchOutlined } from '@ant-design/icons';
import { Stack } from '@mui/material';
import { Button, DatePicker, message } from 'antd';
import { useState } from 'react';
const { RangePicker } = DatePicker;
function FilterByDate({ onFilter }) {
    const [dates, setDates] = useState(null);
    const handleChange = (dateRange) => {
        if (dateRange && dateRange[0] && dateRange[1] && dateRange[0].isAfter(dateRange[1])) {
            message.error('From date cannot be after To date');
            return;
        }
        setDates(dateRange);
    };
    const handleFilter = () => {
        if (onFilter) {
            onFilter(dates);
        }
    };
    const handleClear = () => {
        setDates(null);
        if (onFilter) {
            onFilter(null);
        }
    };
    return (_jsxs(Stack, { direction: 'row', spacing: 2, alignItems: 'center', children: [_jsx(RangePicker, { onChange: handleChange, value: dates, format: 'DD/MM/YYYY', placeholder: ['From', 'To'], allowEmpty: [true, true], style: { width: '250px' } }), _jsx(Button, { type: 'primary', icon: _jsx(SearchOutlined, {}), onClick: handleFilter, children: "Apply Filter" }), dates && (dates[0] || dates[1]) && _jsx(Button, { onClick: handleClear, children: "Clear Filter" })] }));
}
export default FilterByDate;
