import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Refresh } from '@mui/icons-material';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { Modal } from 'antd';
import { useCallback, useState } from 'react';
import CustomTableColumnOptions from '../../../components/TableColumnOptions';
import CustomTableColumnOptionsModal from '../../../components/TableColumnOptions/CustomTableColumnOptionModal';
import CustomTableFilterContainer from '../../../components/TableFilter';
import { COLOR_CODE } from '../../../configs/color';
import { useGetListTransactions } from '../../../queries/Transaction/useGetListTransactions';
import { CreateUpdateTransactionModal } from '../CreateUpdateTransactionModal';
import TransactionFilter from '../TransactionFillter';
export const TransactionToolbar = ({ table }) => {
    const { handleInvalidateListTransactions } = useGetListTransactions();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const openCreateModal = useCallback(() => {
        setIsModalVisible(true);
    }, []);
    const closeModal = useCallback(() => {
        setIsModalVisible(false);
    }, []);
    return (_jsxs(Stack, { direction: 'column', mt: 1, children: [_jsx(Stack, { direction: 'row', mb: 1, justifyContent: 'space-between', children: _jsxs(Stack, { direction: 'row', spacing: 2, alignItems: 'center', children: [_jsx(Tooltip, { placement: 'top', arrow: true, title: 'Refresh', children: _jsx(IconButton, { sx: {
                                    color: COLOR_CODE.HEADER,
                                    background: COLOR_CODE.DISABLED_INPUT,
                                    p: '10px',
                                    borderRadius: 1,
                                    '&:hover': {
                                        backgroundColor: COLOR_CODE.BG_SURFACE_HOVER
                                    }
                                }, onClick: handleInvalidateListTransactions, children: _jsx(Refresh, {}) }) }), _jsx(Tooltip, { title: 'Filter', arrow: true, placement: 'top', children: _jsx(CustomTableFilterContainer, { filterParamsKeys: undefined, children: _jsx(TransactionFilter, {}) }) }), _jsx(CustomTableColumnOptions, { children: _jsx(Tooltip, { title: 'Column Options', arrow: true, placement: 'top', children: _jsx(CustomTableColumnOptionsModal, { table: table }) }) })] }) }), _jsx(Modal, { title: 'Create Transaction', open: isModalVisible, onCancel: closeModal, footer: null, centered: true, styles: { body: { maxHeight: '60vh', overflowY: 'auto', padding: '8px', backgroundColor: 'transparent' } }, children: _jsx(CreateUpdateTransactionModal, { onCloseModal: closeModal }) })] }));
};
