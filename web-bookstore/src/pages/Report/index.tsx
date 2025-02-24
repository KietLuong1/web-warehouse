/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EditOutlined } from '@mui/icons-material'
import { Modal, Tooltip } from 'antd'
import { useCallback, useState } from 'react'
import { CustomTable } from '../../components/Table'
import { Toastify } from '../../components/Toastify'
import { ReportTypes } from '../../queries/Reports'
import { useDeleteReport } from '../../queries/Reports/useDeleteReport'
import { useGetListReport } from '../../queries/Reports/useGetListReports'
import { CreateUpdateReportModal } from './CreateUpdateReportModal'
import { allColumns } from './allColumns'
import ExportFile from './ExportFile'
import { Stack } from '@mui/material'
// import { CreateUpdateInventoryModal } from './CreateUpdateInventoryModal'

function Report() {
  const { data, isFetching, handleInvalidateListReport } = useGetListReport()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedRow, setSelectedRow] = useState<ReportTypes | undefined>(undefined)

  const closeModal = useCallback(() => {
    setIsModalVisible(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalVisible])

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

  const renderRowActions = (row: ReportTypes) => (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
      <Tooltip title='Edit'>
        <EditOutlined
          style={{ fontSize: '16px', color: 'blue', cursor: 'pointer' }}
          onClick={() => {
            setIsModalVisible(true)
            setSelectedRow(row)
          }}
        />
      </Tooltip>

      <Tooltip title='Delete'>
        <DeleteOutlined
          style={{ fontSize: '16px', color: 'red', cursor: 'pointer' }}
          onClick={() => handleDeleteRecord(row)}
        />
      </Tooltip>
    </div>
  )

  return (
    <>
      <CustomTable<ReportTypes>
        data={data || []}
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
              data={data || []}
              columns={allColumns}
              selectedRows={table.getSelectedRowModel().rows.map((row: { original: any }) => row.original)}
              filename='Warehouse Report'
            />
          </Stack>
        )}
        rowCount={5}
        // renderTopToolbarCustomActions={({ table }) => (
        //   <CustomTableSearch table={table} placeholder='Search by Inventory ID' />
        // )}
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
    </>
  )
}

export default Report
