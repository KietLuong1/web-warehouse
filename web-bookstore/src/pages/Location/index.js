import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { Modal, Tooltip } from 'antd';
import { useCallback, useState } from 'react';
import { CustomTableSearch } from '../../components/CustomTableSearch';
import { CustomTable } from '../../components/Table';
import { Toastify } from '../../components/Toastify';
import { useDeleteLocation } from '../../queries/Location/useDeleteLocation';
import { useGetListLocation } from '../../queries/Location/useGetListLocation';
import { allColumns } from './allColumns';
import { CreateUpdateLocationModal } from './CreateUpdateLocationModal';
import { LocationDetailModal } from './LocationDetailModel';
import { LocationToolbar } from './LocationToolbar';
function Location() {
    const { data, isFetching, handleInvalidateListLocation } = useGetListLocation();
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
    const { onDeleteLocation } = useDeleteLocation({
        onSuccess() {
            Toastify(`success`, `Deleted record successfully!`);
            handleInvalidateListLocation();
        }
    });
    const handleDeleteRecord = useCallback((rowData) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'This action cannot be undone.',
            centered: true,
            onOk() {
                onDeleteLocation(rowData);
            }
        });
    }, [onDeleteLocation]);
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
    return (_jsxs(_Fragment, { children: [_jsx(CustomTable, { data: data || [], isLoading: isFetching, columns: allColumns, isLayoutGridMode: true, enableDensityToggle: false, enableColumnDragging: false, enableRowActions: true, renderRowActions: ({ row }) => renderRowActions(row.original), isColumnPinning: true, nameColumnPinning: 'mrt-row-actions', initialState: { columnPinning: { right: ['mrt-row-actions'] } }, renderToolbarInternalActions: ({ table }) => _jsx(LocationToolbar, { table: table }), renderTopToolbarCustomActions: ({ table }) => (_jsx(CustomTableSearch, { table: table, placeholder: 'Search by Code Number or Zone Name' })), muiTableBodyRowProps: ({ row }) => ({
                    onClick: () => handleRowClick(row.original),
                    sx: { cursor: 'pointer' }
                }) }), _jsx(Modal, { title: 'Edit Record', open: isModalVisible, onCancel: closeModal, footer: null, centered: true, styles: { body: { maxHeight: '60vh', overflowY: 'auto', padding: '8px', backgroundColor: 'transparent' } }, children: _jsx(CreateUpdateLocationModal, { onCloseModal: closeModal, isEdit: true, locationId: selectedRow?.location_id }) }), _jsx(LocationDetailModal, { isVisible: isDetailModalVisible, onClose: closeDetailModal, locationData: selectedRow })] }));
}
export default Location;
