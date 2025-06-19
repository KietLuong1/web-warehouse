import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ViewWeek } from '@mui/icons-material';
import { IconButton, Popover, Tooltip } from '@mui/material';
import React from 'react';
import { COLOR_CODE } from '../../configs/color';
const CustomTableColumnOptions = ({ children }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'custom-table-filter-popover' : undefined;
    return (_jsxs(_Fragment, { children: [_jsx(Tooltip, { title: 'Column Options', arrow: true, placement: 'top', children: _jsx(IconButton, { "aria-describedby": id, onClick: handleClick, sx: {
                        backgroundColor: COLOR_CODE.BG_INPUT_DISABLED,
                        borderRadius: 1,
                        '&:hover': {
                            backgroundColor: COLOR_CODE.BG_SURFACE_HOVER
                        },
                        p: '10px'
                    }, children: _jsx(ViewWeek, {}) }) }), _jsx(Popover, { id: id, open: open, anchorEl: anchorEl, onClose: handleClose, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right'
                }, transformOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }, slotProps: {
                    paper: {
                        sx: {
                            backgroundColor: COLOR_CODE.WHITE,
                            marginTop: '4px'
                        }
                    }
                }, children: React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {
                            handleClosePopup: handleClose
                        });
                    }
                    return child;
                }) })] }));
};
export default CustomTableColumnOptions;
