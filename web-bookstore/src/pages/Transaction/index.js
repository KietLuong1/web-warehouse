import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { Modal, Tooltip } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CustomTableSearch } from '../../components/CustomTableSearch';
import { CustomTable } from '../../components/Table';
import { Toastify } from '../../components/Toastify';
import { useDeleteTransaction } from '../../queries/Transaction/useDeleteTransactiont';
import { useGetListTransactions } from '../../queries/Transaction/useGetListTransactions';
import { allColumns } from './allColumns';
import { CreateUpdateTransactionModal } from './CreateUpdateTransactionModal';
import { TransactionDetailModal } from './TransactionDetailModel';
import { TransactionToolbar } from './TransactionToolbar';
function Transaction() {
    const [searchParams, setSearchParams] = useSearchParams();
    const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
    const sizeFromUrl = parseInt(searchParams.get('size') || '10', 10);
    const keywordFromUrl = searchParams.get('keyword') || '';
    const [paginationState, setPaginationState] = useState({
        pageIndex: pageFromUrl - 1,
        pageSize: sizeFromUrl
    });
    const [searchKeyword, setSearchKeyword] = useState(keywordFromUrl);
    const { transactions, isFetching, handleInvalidateListTransactions, totalElements, totalPages, setParams } = useGetListTransactions({
        page: paginationState.pageIndex + 1,
        size: paginationState.pageSize,
        keyword: searchKeyword
    });
    useEffect(() => {
        setParams({
            page: paginationState.pageIndex + 1,
            size: paginationState.pageSize,
            keyword: searchKeyword
        });
    }, [paginationState.pageIndex, paginationState.pageSize, searchKeyword, setParams]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [selectedRow, setSelectedRow] = useState(undefined);
    const closeModal = useCallback(() => {
        setIsModalVisible(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isModalVisible]);
    const closeDetailModal = useCallback(() => {
        setIsDetailModalVisible(false);
    }, []);
    const { onDeleteTransaction } = useDeleteTransaction({
        onSuccess() {
            Toastify(`success`, `Deleted record successfully!`);
            handleInvalidateListTransactions();
        }
    });
    const handleDeleteRecord = useCallback((rowData) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'This action cannot be undone.',
            centered: true,
            onOk() {
                onDeleteTransaction(rowData);
            }
        });
    }, [onDeleteTransaction]);
    const renderRowActions = (row) => (_jsxs("div", { style: { display: 'flex', gap: '8px', justifyContent: 'center' }, children: [_jsx(Tooltip, { title: 'Edit', children: _jsx(EditOutlined, { style: { fontSize: '16px', color: 'blue', cursor: 'pointer' }, onClick: (e) => {
                        e.stopPropagation();
                        setIsModalVisible(true);
                        setSelectedRow(row);
                    } }) }), _jsx(Tooltip, { title: 'Delete', children: _jsx(DeleteOutlined, { style: { fontSize: '16px', color: 'red', cursor: 'pointer' }, onClick: (e) => {
                        e.stopPropagation();
                        handleDeleteRecord(row);
                    } }) })] }));
    const handleSearch = (keyword) => {
        setSearchKeyword(keyword);
        setPaginationState((prev) => ({
            ...prev,
            pageIndex: 0
        }));
        const params = {
            page: '1',
            size: paginationState.pageSize.toString()
        };
        if (keyword && keyword.trim() !== '') {
            params.keyword = keyword;
        }
        setSearchParams(params);
    };
    const handleRowClick = useCallback((row) => {
        setSelectedRow(row);
        setIsDetailModalVisible(true);
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(CustomTable, { data: transactions, isLoading: isFetching, columns: allColumns, isLayoutGridMode: true, enableDensityToggle: false, enableColumnDragging: false, enableRowActions: true, renderRowActions: ({ row }) => renderRowActions(row.original), isColumnPinning: true, nameColumnPinning: 'mrt-row-actions', renderToolbarInternalActions: ({ table }) => _jsx(TransactionToolbar, { table: table }), renderTopToolbarCustomActions: ({ table }) => (_jsx(CustomTableSearch, { table: table, placeholder: 'Search by Product name', onSearch: handleSearch, searchText: searchKeyword })), muiTableBodyRowProps: ({ row }) => ({
                    onClick: () => handleRowClick(row.original),
                    sx: { cursor: 'pointer' }
                }), manualPagination: true, pageCount: totalPages, rowCount: totalElements, initialState: {
                    columnPinning: { right: ['mrt-row-actions'] },
                    pagination: { pageIndex: 0, pageSize: 10 }
                }, state: {
                    pagination: paginationState
                }, onPaginationChange: (updater) => {
                    const newPagination = typeof updater === 'function' ? updater(paginationState) : updater;
                    setPaginationState(newPagination);
                    const params = {
                        page: (newPagination.pageIndex + 1).toString(),
                        size: newPagination.pageSize.toString()
                    };
                    if (searchKeyword && searchKeyword.trim() !== '') {
                        params.keyword = searchKeyword;
                    }
                    setSearchParams(params);
                } }), _jsx(Modal, { title: 'Edit Record', open: isModalVisible, onCancel: closeModal, footer: null, centered: true, styles: { body: { maxHeight: '60vh', overflowY: 'auto', padding: '8px', backgroundColor: 'transparent' } }, children: _jsx(CreateUpdateTransactionModal, { onCloseModal: closeModal, isEdit: true, transactionId: selectedRow?.id }) }), _jsx(TransactionDetailModal, { isVisible: isDetailModalVisible, onClose: closeDetailModal, transactionData: selectedRow })] }));
}
export default Transaction;
