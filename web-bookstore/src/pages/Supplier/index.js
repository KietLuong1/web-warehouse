import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { Modal, Tooltip } from 'antd';
import { useCallback, useState } from 'react';
import { CustomTableSearch } from '../../components/CustomTableSearch';
import { CustomTable } from '../../components/Table';
import { Toastify } from '../../components/Toastify';
import { useDeleteSupplier } from '../../queries/Supplier/useDeleteSupplier';
import { useGetListSuppliers } from '../../queries/Supplier/useGetListSuppliers';
import { allColumns } from './allColumns';
import { CreateUpdateSupplierModal } from './CreateUpdateSupplierModal';
import { SupplierToolbar } from './SupplierToolbar';
import { SupplierDetailModal } from './SupplierDetailModel';
function Supplier() {
    const { data, isFetching, handleInvalidateListSuppliers } = useGetListSuppliers();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [selectedRow, setSelectedRow] = useState(undefined);
    const closeModal = useCallback(() => {
        setIsModalVisible(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isModalVisible]);
    const closeDetailModal = useCallback(() => {
        setIsDetailModalVisible(false);
    }, [isDetailModalVisible]);
    const { onDeleteSupplier } = useDeleteSupplier({
        onSuccess() {
            Toastify(`success`, `Deleted supplier successfully!`);
            handleInvalidateListSuppliers();
        }
    });
    const handleDeleteRecord = useCallback((rowData) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'This action cannot be undone.',
            centered: true,
            onOk() {
                onDeleteSupplier(rowData);
            }
        });
    }, [onDeleteSupplier]);
    const renderRowActions = (row) => (_jsxs("div", { style: { display: 'flex', gap: '8px', justifyContent: 'center' }, children: [_jsx(Tooltip, { title: 'Edit', children: _jsx(EditOutlined, { style: { fontSize: '16px', color: 'blue', cursor: 'pointer' }, onClick: (e) => {
                        e.stopPropagation();
                        setIsModalVisible(true);
                        setSelectedRow(row);
                    } }) }), _jsx(Tooltip, { title: 'Delete', children: _jsx(DeleteOutlined, { style: { fontSize: '16px', color: 'red', cursor: 'pointer' }, onClick: (e) => {
                        e.stopPropagation();
                        handleDeleteRecord(row);
                    } }) })] }));
    const handleRowClick = useCallback((row) => {
        setSelectedRow(row);
        setIsDetailModalVisible(true);
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(CustomTable, { data: data || [], isLoading: isFetching, columns: allColumns, isLayoutGridMode: true, enableDensityToggle: false, enableColumnDragging: false, enableRowActions: true, renderRowActions: ({ row }) => renderRowActions(row.original), isColumnPinning: true, nameColumnPinning: 'mrt-row-actions', initialState: { columnPinning: { right: ['mrt-row-actions'] } }, renderToolbarInternalActions: ({ table }) => _jsx(SupplierToolbar, { table: table }), renderTopToolbarCustomActions: ({ table }) => (_jsx(CustomTableSearch, { table: table, placeholder: 'Search by Name or Email' })), muiTableBodyRowProps: ({ row }) => ({
                    onClick: () => handleRowClick(row.original),
                    sx: { cursor: 'pointer' }
                }) }), _jsx(Modal, { title: 'Edit Supplier', open: isModalVisible, onCancel: closeModal, footer: null, centered: true, styles: { body: { maxHeight: '60vh', overflowY: 'auto', padding: '8px', backgroundColor: 'transparent' } }, children: _jsx(CreateUpdateSupplierModal, { onCloseModal: closeModal, isEdit: true, supplierId: selectedRow?.supplierId }) }), _jsx(SupplierDetailModal, { isVisible: isDetailModalVisible, onClose: closeDetailModal, supplierData: selectedRow })] }));
}
export default Supplier;
