import { DeleteOutlined, EditOutlined } from '@mui/icons-material'
import { Modal, Tooltip } from 'antd'
import { useCallback, useState } from 'react'
import { CustomTableSearch } from '../../components/CustomTableSearch'
import { CustomTable } from '../../components/Table'
import { Toastify } from '../../components/Toastify'
import { SupplierTypes } from '../../queries'
import { useDeleteSupplier } from '../../queries/Supplier/useDeleteSupplier'
import { useGetListSuppliers } from '../../queries/Supplier/useGetListSuppliers'
import { allColumns } from './allColumns'
import { CreateUpdateSupplierModal } from './CreateUpdateSupplierModal'
import { SupplierToolbar } from './SupplierToolbar'

function Supplier() {
  const { data, isFetching, handleInvalidateListSuppliers } = useGetListSuppliers()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedRow, setSelectedRow] = useState<SupplierTypes | undefined>(undefined)

  const closeModal = useCallback(() => {
    setIsModalVisible(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalVisible])

  const { onDeleteSupplier } = useDeleteSupplier({
    onSuccess() {
      Toastify(`success`, `Deleted supplier successfully!`)
      handleInvalidateListSuppliers()
    }
  })

  const handleDeleteRecord = useCallback(
    (rowData: SupplierTypes) => {
      Modal.confirm({
        title: 'Are you sure?',
        content: 'This action cannot be undone.',
        centered: true,
        onOk() {
          onDeleteSupplier(rowData)
        }
      })
    },
    [onDeleteSupplier]
  )

  const renderRowActions = (row: SupplierTypes) => (
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
      <CustomTable<SupplierTypes>
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
        renderToolbarInternalActions={({ table }) => <SupplierToolbar table={table} />}
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
        <CreateUpdateSupplierModal onCloseModal={closeModal} isEdit supplierId={selectedRow?.supplierId} />
      </Modal>
    </>
  )
}

export default Supplier
