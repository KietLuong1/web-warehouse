import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PlusOutlined } from '@ant-design/icons';
import { Refresh } from '@mui/icons-material';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { Button, Modal } from 'antd';
import { useCallback, useState } from 'react';
import CustomTableColumnOptions from '../../../components/TableColumnOptions';
import CustomTableColumnOptionsModal from '../../../components/TableColumnOptions/CustomTableColumnOptionModal';
import CustomTableFilterContainer from '../../../components/TableFilter';
import { COLOR_CODE } from '../../../configs/color';
import { useGetListProducts } from '../../../queries/Product/useGetListProducts';
import { CreateUpdateProductModal } from '../CreateUpdateProductModal';
import ProductFilter from '../ProductFillter';
export const ProductToolbar = ({ table }) => {
    const { handleInvalidateListProducts } = useGetListProducts();
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
                                }, onClick: handleInvalidateListProducts, children: _jsx(Refresh, {}) }) }), _jsx(Tooltip, { title: 'Filter', arrow: true, placement: 'top', children: _jsx(CustomTableFilterContainer, { filterParamsKeys: undefined, children: _jsx(ProductFilter, {}) }) }), _jsx(CustomTableColumnOptions, { children: _jsx(Tooltip, { title: 'Column Options', arrow: true, placement: 'top', children: _jsx(CustomTableColumnOptionsModal, { table: table }) }) }), _jsx(Button, { type: 'primary', size: 'large', onClick: openCreateModal, icon: _jsx(PlusOutlined, {}), children: "Create" })] }) }), _jsx(Modal, { title: 'Create Product', open: isModalVisible, onCancel: closeModal, footer: null, centered: true, styles: { body: { maxHeight: '60vh', overflowY: 'auto', padding: '8px', backgroundColor: 'transparent' } }, children: _jsx(CreateUpdateProductModal, { onCloseModal: closeModal }) })] }));
};
