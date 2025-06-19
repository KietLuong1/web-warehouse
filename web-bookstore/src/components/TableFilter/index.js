import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { FilterList } from '@mui/icons-material';
import { Badge, IconButton, Popover, Tooltip } from '@mui/material';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { COLOR_CODE } from '../../configs/color';
const CustomTableFilterContainer = ({ children, filterParamsKeys = [] }) => {
    const [query] = useSearchParams();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isHasFilterParams = filterParamsKeys.some((s) => query.has(s));
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'custom-table-filter-popover' : undefined;
    return (_jsxs(_Fragment, { children: [_jsx(Tooltip, { title: 'Filter', arrow: true, placement: 'top', children: _jsx(IconButton, { "aria-describedby": id, onClick: handleClick, sx: {
                        color: COLOR_CODE.GREY_800,
                        backgroundColor: COLOR_CODE.BG_INPUT_DISABLED,
                        borderRadius: 1,
                        '&:hover': {
                            backgroundColor: COLOR_CODE.BG_SURFACE_HOVER
                        },
                        p: '10px'
                    }, children: _jsx(Badge, { variant: 'dot', color: 'error', invisible: !isHasFilterParams, children: _jsx(FilterList, {}) }) }) }), _jsx(Popover, { id: id, open: open, anchorEl: anchorEl, onClose: handleClose, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right'
                }, transformOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }, slotProps: {
                    paper: {
                        sx: {
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            marginTop: '4px',
                            boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.20), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
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
export default CustomTableFilterContainer;
