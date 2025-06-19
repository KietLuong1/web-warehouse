import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Checkbox, Container, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material';
import { COLOR_CODE } from '../../../configs/color';
export default function CustomTableColumnOptionsModal({ table, hasActionColumn = true }) {
    const removedColumnHeaders = ['Select', 'Expand', 'Action'];
    const allDataColumns = hasActionColumn
        ? table
            .getAllLeafColumns()
            .filter((column) => column.columnDef.header && !removedColumnHeaders.includes(column.columnDef.header))
        : table.getAllLeafColumns().filter((column) => column.columnDef.header);
    const totalCheckedColumns = allDataColumns.reduce((totalCheck, column) => totalCheck + (column.getIsVisible() ? 1 : 0), 0);
    if (!table) {
        return _jsx("div", { children: "Loading..." });
    }
    return (_jsxs(Container, { maxWidth: 'xs', sx: { py: '16px', pb: '24px' }, children: [_jsxs(Stack, { direction: 'row', alignItems: 'flex-end', mb: 2, justifyContent: 'space-between', children: [_jsx(Typography, { variant: 'h5', mr: 3, color: COLOR_CODE.GREY_900, children: "Column Options" }), _jsx(Button, { variant: 'text', onClick: (e) => {
                            if (table.getIsAllColumnsVisible()) {
                                return;
                            }
                            table.getToggleAllColumnsVisibilityHandler()(e);
                        }, style: { fontSize: 14, height: '100%' }, children: "Show all" })] }), _jsx(Stack, { children: _jsx(FormGroup, { children: allDataColumns.map((column) => !removedColumnHeaders.includes(column.columnDef.header) && (_jsx(FormControlLabel, { control: _jsx(Checkbox, { checked: column.getIsVisible(), disabled: column.getIsVisible() && totalCheckedColumns === 1, onChange: column.getToggleVisibilityHandler() }), label: column.columnDef.header }, column.id))) }) })] }));
}
