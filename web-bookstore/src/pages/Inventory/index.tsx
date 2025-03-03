import { DeleteOutlined, EditOutlined } from '@mui/icons-material'
import { Modal, Tooltip } from 'antd'
import { useCallback, useState } from 'react'
import { CustomTableSearch } from '../../components/CustomTableSearch'
import { CustomTable } from '../../components/Table'
import { Toastify } from '../../components/Toastify'
import { InventoryTypes } from '../../queries/Inventory'
import { useDeleteInventory } from '../../queries/Inventory/useDeleteInventory'
import { useGetListInventory } from '../../queries/Inventory/useGetListInventorys'
import { allColumns } from './allColumns'
import { CreateUpdateInventoryModal } from './CreateUpdateInventoryModal'
import { InventoryToolbar } from './InventoryToolbar'
import { InventoryDetailModal } from './InventoryDetailModel'

function Inventory() {
  const { data, isFetching, handleInvalidateListInventory } = useGetListInventory()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)

  const [selectedRow, setSelectedRow] = useState<InventoryTypes | undefined>(undefined)

  const closeModal = useCallback(() => {
    setIsModalVisible(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalVisible])

  const closeDetailModal = useCallback(() => {
    setIsDetailModalVisible(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDetailModalVisible])

  const { onDeleteInventory } = useDeleteInventory({
    onSuccess() {
      Toastify(`success`, `Deleted record successfully!`)
      handleInvalidateListInventory()
    }
  })

  const handleDeleteRecord = useCallback(
    (rowData: InventoryTypes) => {
      Modal.confirm({
        title: 'Are you sure?',
        content: 'This action cannot be undone.',
        centered: true,
        onOk() {
          onDeleteInventory(rowData)
        }
      })
    },
    [onDeleteInventory]
  )

  const renderRowActions = (row: InventoryTypes) => (
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

  const handleRowClick = useCallback((row: InventoryTypes) => {
    setSelectedRow(row)
    setIsDetailModalVisible(true)
  }, [])

  return (
    <>
      <CustomTable<InventoryTypes>
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
        renderToolbarInternalActions={({ table }) => <InventoryToolbar table={table} />}
        renderTopToolbarCustomActions={({ table }) => (
          <CustomTableSearch table={table} placeholder='Search by Inventory ID' />
        )}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => handleRowClick(row.original),
          sx: { cursor: 'pointer' }
        })}
      />
      <Modal
        title='Edit Inventory'
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        centered
        styles={{ body: { maxHeight: '60vh', overflowY: 'auto', padding: '8px', backgroundColor: 'transparent' } }}
      >
        <CreateUpdateInventoryModal onCloseModal={closeModal} isEdit inventoryId={selectedRow?.inventory_id} />
      </Modal>

      <InventoryDetailModal isVisible={isDetailModalVisible} onClose={closeDetailModal} inventoryData={selectedRow} />
    </>
  )
}

export default Inventory
