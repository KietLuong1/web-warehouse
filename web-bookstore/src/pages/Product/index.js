import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { Modal, Tooltip } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { CustomTableSearch } from '../../components/CustomTableSearch';
import { CustomTable } from '../../components/Table';
import { Toastify } from '../../components/Toastify';
import { useDeleteProduct } from '../../queries/Product/useDeleteProduct';
import { useGetListProducts } from '../../queries/Product/useGetListProducts';
import { useGetListCategories } from '../../queries/Setting/useGetListCategories';
import { allColumns } from './allColumns';
import { CreateUpdateProductModal } from './CreateUpdateProductModal';
import { ProductDetailModal } from './ProductDetailModel';
import { ProductToolbar } from './ProductToolbar';
import { useSearchParams } from 'react-router-dom';
function Product() {
    const [searchParams, setSearchParams] = useSearchParams();
    const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
    const sizeFromUrl = parseInt(searchParams.get('size') || '10', 10);
    const [paginationState, setPaginationState] = useState({
        pageIndex: pageFromUrl - 1,
        pageSize: sizeFromUrl
    });
    useEffect(() => {
        const currentPage = searchParams.get('page');
        const currentSize = searchParams.get('size');
        const newPage = (paginationState.pageIndex + 1).toString();
        const newSize = paginationState.pageSize.toString();
        if (currentPage !== newPage || currentSize !== newSize) {
            setSearchParams({
                page: newPage,
                size: newSize
            });
        }
    }, [paginationState, searchParams, setSearchParams]);
    const { products, isFetching, handleInvalidateListProducts, setParams, totalPages, totalElements } = useGetListProducts({
        page: paginationState.pageIndex + 1,
        size: paginationState.pageSize
    });
    const { categories } = useGetListCategories();
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
    const { onDeleteProduct } = useDeleteProduct({
        onSuccess() {
            Toastify(`success`, `Deleted Product successfully!`);
            handleInvalidateListProducts();
        }
    });
    const handleDeleteRecord = useCallback((rowData) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'This action cannot be undone.',
            centered: true,
            onOk() {
                onDeleteProduct(rowData);
            }
        });
    }, [onDeleteProduct]);
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
    return (_jsxs(_Fragment, { children: [_jsx(CustomTable, { data: products ? (Array.isArray(products) ? products : [products]) : [], isLoading: isFetching, columns: allColumns, isLayoutGridMode: true, enableDensityToggle: false, enableColumnDragging: false, enableRowActions: true, renderRowActions: ({ row }) => renderRowActions(row.original), isColumnPinning: true, nameColumnPinning: 'mrt-row-actions', renderToolbarInternalActions: ({ table }) => _jsx(ProductToolbar, { table: table }), renderTopToolbarCustomActions: ({ table }) => _jsx(CustomTableSearch, { table: table, placeholder: 'Search by Name' }), muiTableBodyRowProps: ({ row }) => ({
                    onClick: () => handleRowClick(row.original),
                    sx: { cursor: 'pointer' }
                }), meta: { categories }, manualPagination: true, pageCount: totalPages, rowCount: totalElements, initialState: {
                    columnPinning: { right: ['mrt-row-actions'] },
                    pagination: { pageIndex: 0, pageSize: 10 }
                }, state: {
                    pagination: paginationState
                }, onPaginationChange: (updater) => {
                    const newPagination = typeof updater === 'function' ? updater(paginationState) : updater;
                    setPaginationState(newPagination);
                    setParams({ page: newPagination.pageIndex + 1, size: newPagination.pageSize });
                } }), _jsx(Modal, { title: 'Edit Record', open: isModalVisible, onCancel: closeModal, footer: null, centered: true, styles: {
                    body: {
                        maxHeight: '60vh',
                        overflowY: 'auto',
                        padding: '8px',
                        backgroundColor: 'transparent'
                    }
                }, children: _jsx(CreateUpdateProductModal, { onCloseModal: closeModal, isEdit: true, productId: selectedRow?.productId }) }), _jsx(ProductDetailModal, { isVisible: isDetailModalVisible, onClose: closeDetailModal, productData: selectedRow })] }));
}
export default Product;
