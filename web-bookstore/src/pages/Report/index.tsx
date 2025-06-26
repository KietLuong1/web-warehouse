/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EditOutlined } from '@mui/icons-material'
import { Box, Grid, Grid2, Stack } from '@mui/material'
import { message, Modal, Tooltip } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { CustomTable } from '../../components/Table'
import { Toastify } from '../../components/Toastify'
import { ReportResponse } from '../../queries/Reports'
import { useDeleteReport } from '../../queries/Reports/useDeleteReport'
import { useGetListReport } from '../../queries/Reports/useGetListReports'
import { allColumns } from './allColumns'
import { CreateUpdateReportModal } from './CreateUpdateReportModal'
import ExportFile from './ExportFile'
import { ReportDetailModal } from './ReportDetailModal'
import FilterByDate from './ReportFilter'
import dayjs from 'dayjs'

function Report() {
  const { reportList: allReports, isFetching, handleInvalidateListReport } = useGetListReport()
  const [filteredReports, setFilteredReports] = useState<ReportResponse[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)
  const [selectedRow, setSelectedRow] = useState<ReportResponse | undefined>(undefined)
  const [dateFilter, setDateFilter] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null)

  useEffect(() => {
    setFilteredReports(allReports || [])
  }, [allReports])

  const closeModal = useCallback(() => {
    setIsModalVisible(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalVisible])

  const closeDetailModal = useCallback(() => {
    setIsDetailModalVisible(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDetailModalVisible])

  const { onDeleteReport } = useDeleteReport({
    onSuccess() {
      Toastify(`success`, `Deleted record successfully!`)
      handleInvalidateListReport()
    }
  })

  const handleDeleteRecord = useCallback(
    (rowData: ReportResponse) => {
      Modal.confirm({
        title: 'Are you sure?',
        content: 'This action cannot be undone.',
        centered: true,
        onOk() {
          onDeleteReport(rowData)
        }
      })
    },
    [onDeleteReport]
  )

  const handleRowClick = useCallback((row: ReportResponse) => {
    setSelectedRow(row)
    setIsDetailModalVisible(true)
  }, [])

  const renderRowActions = (row: ReportResponse) => (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
      {/* <Tooltip title='Edit'>
        <EditOutlined
          style={{ fontSize: '16px', color: 'blue', cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation()
            console.log('Selected row for edit:', row)
            setIsModalVisible(true)
            setSelectedRow(row)
          }}
        />
      </Tooltip> */}

      <Tooltip title='Delete'>
        <DeleteOutlined
          style={{ fontSize: '16px', color: 'red', cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation()
            handleDeleteRecord(row)
          }}
        />
      </Tooltip>
    </div>
  )

  const handleDateFilter = (dateRange: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
    setDateFilter(dateRange)

    if (!dateRange || (!dateRange[0] && !dateRange[1])) {
      setFilteredReports(allReports || [])
      return
    }

    const [fromDate, toDate] = dateRange

    if (fromDate && toDate && fromDate.isAfter(toDate)) {
      message.error('From date cannot be after To date')
      setFilteredReports(allReports || [])
      return
    }

    const filtered = allReports?.filter((report) => {
      const reportDate = dayjs(report.createdAt)

      // Case 1: Only From date is provided (filter reports from this date onwards)
      if (fromDate && !toDate) {
        return reportDate.isAfter(fromDate, 'day') || reportDate.isSame(fromDate, 'day')
      }

      // Case 2: Only To date is provided (filter reports up to this date)
      if (!fromDate && toDate) {
        return reportDate.isBefore(toDate, 'day') || reportDate.isSame(toDate, 'day')
      }

      // Case 3: Both dates provided (filter reports between these dates)
      if (fromDate && toDate) {
        return (
          (reportDate.isAfter(fromDate, 'day') || reportDate.isSame(fromDate, 'day')) &&
          (reportDate.isBefore(toDate, 'day') || reportDate.isSame(toDate, 'day'))
        )
      }

      return true
    })

    setFilteredReports(filtered || [])
  }

  return (
    <>
      <CustomTable
        data={filteredReports}
        isLoading={isFetching}
        columns={allColumns}
        isLayoutGridMode
        enableDensityToggle={false}
        enableColumnDragging={false}
        enableRowSelection={true}
        enableRowActions
        renderRowActions={({ row }) => renderRowActions(row.original)}
        isColumnPinning={true}
        nameColumnPinning='mrt-row-actions'
        initialState={{ columnPinning: { right: ['mrt-row-actions'] } }}
        renderToolbarInternalActions={({ table }) => (
          <Stack
            className='report-table'
            flexDirection='row'
            marginTop={1.5}
            marginBottom={1.5}
            direction='row'
            spacing={2}
            alignItems='center'
            justifyContent='space-between'
          >
            <FilterByDate onFilter={handleDateFilter} />

            <ExportFile
              data={filteredReports || []}
              columns={allColumns}
              selectedRows={table.getSelectedRowModel().rows.map((row: { original: any }) => row.original)}
              filename='Warehouse Report'
            />
          </Stack>
        )}
        rowCount={filteredReports.length}
        pageCount={Math.ceil(filteredReports.length / 10)}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => handleRowClick(row.original),
          sx: { cursor: 'pointer' }
        })}
      />
      <Modal
        title='Edit Report'
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        centered
        styles={{ body: { maxHeight: '60vh', overflowY: 'auto', padding: '8px', backgroundColor: 'transparent' } }}
      >
        <CreateUpdateReportModal onCloseModal={closeModal} isEdit id={selectedRow?.id} />
      </Modal>

      <ReportDetailModal isVisible={isDetailModalVisible} onClose={closeDetailModal} reportData={selectedRow} />
    </>
  )
}

export default Report
