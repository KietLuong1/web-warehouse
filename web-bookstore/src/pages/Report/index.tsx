/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EditOutlined } from '@mui/icons-material'
import { Stack } from '@mui/material'
import { Modal, Tooltip } from 'antd'
import { useCallback, useState } from 'react'
import { CustomTable } from '../../components/Table'
import { Toastify } from '../../components/Toastify'
import { ReportTypes } from '../../queries/Reports'
import { useDeleteReport } from '../../queries/Reports/useDeleteReport'
import { useGetListReport } from '../../queries/Reports/useGetListReports'
import { allColumns } from './allColumns'
import { CreateUpdateReportModal } from './CreateUpdateReportModal'
import ExportFile from './ExportFile'
import { ReportDetailModal } from './ReportDetailModal'

function Report() {
  const { reportList, isFetching, handleInvalidateListReport } = useGetListReport()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)
  const [selectedRow, setSelectedRow] = useState<ReportTypes | undefined>(undefined)

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
    (rowData: ReportTypes) => {
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

  const handleRowClick = useCallback((row: ReportTypes) => {
    setSelectedRow(row)
    setIsDetailModalVisible(true)
  }, [])

  const renderRowActions = (row: ReportTypes) => (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
      <Tooltip title='Edit'>
        <EditOutlined
          style={{ fontSize: '16px', color: 'blue', cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation()
            console.log('Selected row for edit:', row)
            setIsModalVisible(true)
            setSelectedRow(row)
          }}
        />
      </Tooltip>

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

  return (
    <>
      <CustomTable
        data={reportList}
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
          <Stack marginTop={1.5}>
            <ExportFile
              data={reportList || []}
              columns={allColumns}
              selectedRows={table.getSelectedRowModel().rows.map((row: { original: any }) => row.original)}
              filename='Warehouse Report'
            />
          </Stack>
        )}
        rowCount={10}
        pageCount={2}
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
