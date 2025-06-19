import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { message, Modal, Tooltip } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { CustomTable } from '../../components/Table';
import { Toastify } from '../../components/Toastify';
import { useDeleteReport } from '../../queries/Reports/useDeleteReport';
import { useGetListReport } from '../../queries/Reports/useGetListReports';
import { allColumns } from './allColumns';
import { CreateUpdateReportModal } from './CreateUpdateReportModal';
import ExportFile from './ExportFile';
import { ReportDetailModal } from './ReportDetailModal';
import FilterByDate from './ReportFilter';
import dayjs from 'dayjs';
function Report() {
    const { reportList: allReports, isFetching, handleInvalidateListReport } = useGetListReport();
    const [filteredReports, setFilteredReports] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [selectedRow, setSelectedRow] = useState(undefined);
    const [dateFilter, setDateFilter] = useState(null);
    useEffect(() => {
        setFilteredReports(allReports || []);
    }, [allReports]);
    const closeModal = useCallback(() => {
        setIsModalVisible(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isModalVisible]);
    const closeDetailModal = useCallback(() => {
        setIsDetailModalVisible(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDetailModalVisible]);
    const { onDeleteReport } = useDeleteReport({
        onSuccess() {
            Toastify(`success`, `Deleted record successfully!`);
            handleInvalidateListReport();
        }
    });
    const handleDeleteRecord = useCallback((rowData) => {
        Modal.confirm({
            title: 'Are you sure?',
            content: 'This action cannot be undone.',
            centered: true,
            onOk() {
                onDeleteReport(rowData);
            }
        });
    }, [onDeleteReport]);
    const handleRowClick = useCallback((row) => {
        setSelectedRow(row);
        setIsDetailModalVisible(true);
    }, []);
    const renderRowActions = (row) => (_jsxs("div", { style: { display: 'flex', gap: '8px', justifyContent: 'center' }, children: [_jsx(Tooltip, { title: 'Edit', children: _jsx(EditOutlined, { style: { fontSize: '16px', color: 'blue', cursor: 'pointer' }, onClick: (e) => {
                        e.stopPropagation();
                        console.log('Selected row for edit:', row);
                        setIsModalVisible(true);
                        setSelectedRow(row);
                    } }) }), _jsx(Tooltip, { title: 'Delete', children: _jsx(DeleteOutlined, { style: { fontSize: '16px', color: 'red', cursor: 'pointer' }, onClick: (e) => {
                        e.stopPropagation();
                        handleDeleteRecord(row);
                    } }) })] }));
    const handleDateFilter = (dateRange) => {
        setDateFilter(dateRange);
        if (!dateRange || (!dateRange[0] && !dateRange[1])) {
            setFilteredReports(allReports || []);
            return;
        }
        const [fromDate, toDate] = dateRange;
        if (fromDate && toDate && fromDate.isAfter(toDate)) {
            message.error('From date cannot be after To date');
            setFilteredReports(allReports || []);
            return;
        }
        const filtered = allReports?.filter((report) => {
            const reportDate = dayjs(report.createdAt);
            // Case 1: Only From date is provided (filter reports from this date onwards)
            if (fromDate && !toDate) {
                return reportDate.isAfter(fromDate, 'day') || reportDate.isSame(fromDate, 'day');
            }
            // Case 2: Only To date is provided (filter reports up to this date)
            if (!fromDate && toDate) {
                return reportDate.isBefore(toDate, 'day') || reportDate.isSame(toDate, 'day');
            }
            // Case 3: Both dates provided (filter reports between these dates)
            if (fromDate && toDate) {
                return ((reportDate.isAfter(fromDate, 'day') || reportDate.isSame(fromDate, 'day')) &&
                    (reportDate.isBefore(toDate, 'day') || reportDate.isSame(toDate, 'day')));
            }
            return true;
        });
        setFilteredReports(filtered || []);
    };
    return (_jsxs(_Fragment, { children: [_jsx(CustomTable, { data: filteredReports, isLoading: isFetching, columns: allColumns, isLayoutGridMode: true, enableDensityToggle: false, enableColumnDragging: false, enableRowSelection: true, enableRowActions: true, renderRowActions: ({ row }) => renderRowActions(row.original), isColumnPinning: true, nameColumnPinning: 'mrt-row-actions', initialState: { columnPinning: { right: ['mrt-row-actions'] } }, renderToolbarInternalActions: ({ table }) => (_jsxs(Stack, { className: 'report-table', flexDirection: 'row', marginTop: 1.5, marginBottom: 1.5, direction: 'row', spacing: 2, alignItems: 'center', justifyContent: 'space-between', children: [_jsx(FilterByDate, { onFilter: handleDateFilter }), _jsx(ExportFile, { data: filteredReports || [], columns: allColumns, selectedRows: table.getSelectedRowModel().rows.map((row) => row.original), filename: 'Warehouse Report' })] })), rowCount: filteredReports.length, pageCount: Math.ceil(filteredReports.length / 10), muiTableBodyRowProps: ({ row }) => ({
                    onClick: () => handleRowClick(row.original),
                    sx: { cursor: 'pointer' }
                }) }), _jsx(Modal, { title: 'Edit Report', open: isModalVisible, onCancel: closeModal, footer: null, centered: true, styles: { body: { maxHeight: '60vh', overflowY: 'auto', padding: '8px', backgroundColor: 'transparent' } }, children: _jsx(CreateUpdateReportModal, { onCloseModal: closeModal, isEdit: true, id: selectedRow?.id }) }), _jsx(ReportDetailModal, { isVisible: isDetailModalVisible, onClose: closeDetailModal, reportData: selectedRow })] }));
}
export default Report;
