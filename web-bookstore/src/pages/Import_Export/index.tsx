import { DeleteOutlined, EditOutlined } from '@mui/icons-material'
import { Modal, Tooltip } from 'antd'
import { useCallback, useState } from 'react'
import { CustomTableSearch } from '../../components/CustomTableSearch'
import { CustomTable } from '../../components/Table'
import { Toastify } from '../../components/Toastify'
import { ImportExportTypes } from '../../queries'
import { useDeleteImport_Export } from '../../queries/Import_Export/useDeleteImportExport'
import { useGetListImport } from '../../queries/Import_Export/useGetListImportExport'
import { allColumns } from './allColumns'
import { CreateUpdateImport_ExportModal } from './CreateUpdateImport_ExportModal'
import { Import_ExportToolbar } from './Import_ExportToolbar'

function Service() {
  const { data, isFetching, handleInvalidateListImport } = useGetListImport()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedRow, setSelectedRow] = useState<ImportExportTypes | undefined>(undefined)

  const closeModal = useCallback(() => {
    setIsModalVisible(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalVisible])

  const { onDeleteImportExport } = useDeleteImport_Export({
    onSuccess() {
      Toastify(`success`, `Deleted record successfully!`)
      handleInvalidateListImport()
    }
  })

  const handleDeleteRecord = useCallback(
    (rowData: ImportExportTypes) => {
      Modal.confirm({
        title: 'Are you sure?',
        content: 'This action cannot be undone.',
        centered: true,
        onOk() {
          onDeleteImportExport(rowData)
        }
      })
    },
    [onDeleteImportExport]
  )

  const renderRowActions = (row: ImportExportTypes) => (
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
      <CustomTable<ImportExportTypes>
        data={data || []}
        isLoading={isFetching}
        columns={allColumns}
        isLayoutGridMode
        enableDensityToggle={false}
        enableColumnDragging={false}
        enableRowActions
        renderRowActions={({ row }) => renderRowActions(row.original)}
        isColumnPinning={true}
        nameColumnPinning='mrt-row-actions'
        initialState={{ columnPinning: { right: ['mrt-row-actions'] } }}
        renderToolbarInternalActions={({ table }) => <Import_ExportToolbar table={table} />}
        renderTopToolbarCustomActions={({ table }) => (
          <CustomTableSearch table={table} placeholder='Search by Name or Email' />
        )}
      />
      <Modal
        title='Edit Record'
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        centered
        styles={{ body: { maxHeight: '60vh', overflowY: 'auto', padding: '8px', backgroundColor: 'transparent' } }}
      >
        <CreateUpdateImport_ExportModal onCloseModal={closeModal} isEdit importId={selectedRow?.id} />
      </Modal>
    </>
  )
}

export default Service
