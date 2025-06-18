import { DeleteOutlined, EditOutlined } from '@mui/icons-material'
import { Modal, Tooltip } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { CustomTableSearch } from '../../components/CustomTableSearch'
import { CustomTable } from '../../components/Table'
import { Toastify } from '../../components/Toastify'
import { InventoryResponse } from '../../queries/Inventory'
import { useDeleteInventory } from '../../queries/Inventory/useDeleteInventory'
import { useGetListInventory } from '../../queries/Inventory/useGetListInventorys'
import { allColumns } from './allColumns'
import { CreateUpdateInventoryModal } from './CreateUpdateInventoryModal'
import { InventoryToolbar } from './InventoryToolbar'
import { InventoryDetailModal } from './InventoryDetailModel'
import { useSearchParams } from 'react-router-dom'

function Inventory() {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10)
  const sizeFromUrl = parseInt(searchParams.get('size') || '10', 10)

  const [paginationState, setPaginationState] = useState({
    pageIndex: pageFromUrl - 1,
    pageSize: sizeFromUrl
  })

  useEffect(() => {
    const currentPage = searchParams.get('page')
    const currentSize = searchParams.get('size')
    const newPage = (paginationState.pageIndex + 1).toString()
    const newSize = paginationState.pageSize.toString()

    if (currentPage !== newPage || currentSize !== newSize) {
      setSearchParams({
        page: newPage,
        size: newSize
      })
    }
  }, [paginationState, searchParams, setSearchParams])

  const { data, isFetching, handleInvalidateListInventory, totalElements, totalPages, setParams } = useGetListInventory(
    {
      page: paginationState.pageIndex + 1,
      size: paginationState.pageSize
    }
  )
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)

  const [selectedRow, setSelectedRow] = useState<InventoryResponse | undefined>(undefined)

  const closeModal = useCallback(() => {
    setIsModalVisible(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalVisible])

  const closeDetailModal = useCallback(() => {
    setIsDetailModalVisible(false)
  }, [isDetailModalVisible])

  const { onDeleteInventory } = useDeleteInventory({
    onSuccess() {
      Toastify(`success`, `Deleted record successfully!`)
      handleInvalidateListInventory()
    }
  })

  const handleDeleteRecord = useCallback(
    (rowData: InventoryResponse) => {
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

  const renderRowActions = (row: InventoryResponse) => (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
      <Tooltip title='Edit'>
        <EditOutlined
          style={{ fontSize: '16px', color: 'blue', cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation()
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

  const handleRowClick = useCallback((row: InventoryResponse) => {
    setSelectedRow(row)
    setIsDetailModalVisible(true)
  }, [])

  return (
    <>
      <CustomTable<InventoryResponse>
        data={data?.data || []}
        isLoading={isFetching}
        columns={allColumns}
        isLayoutGridMode
        enableDensityToggle={false}
        enableColumnDragging={false}
        enableRowActions
        renderRowActions={({ row }) => renderRowActions(row.original)}
        isColumnPinning={true}
        nameColumnPinning='mrt-row-actions'
        renderToolbarInternalActions={({ table }) => <InventoryToolbar table={table} />}
        renderTopToolbarCustomActions={({ table }) => (
          <CustomTableSearch table={table} placeholder='Search by Inventory ID' />
        )}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => handleRowClick(row.original),
          sx: { cursor: 'pointer' }
        })}
        manualPagination={true}
        pageCount={totalPages}
        rowCount={totalElements}
        initialState={{
          columnPinning: { right: ['mrt-row-actions'] },
          pagination: { pageIndex: 0, pageSize: 10 }
        }}
        state={{
          pagination: paginationState
        }}
        onPaginationChange={(updater) => {
          const newPagination = typeof updater === 'function' ? updater(paginationState) : updater
          setPaginationState(newPagination)
          // The URL will be updated by the useEffect hook
          setParams({ page: newPagination.pageIndex + 1, size: newPagination.pageSize })
        }}
      />

      <Modal
        title='Edit Inventory'
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        centered
        styles={{ body: { maxHeight: '60vh', overflowY: 'auto', padding: '8px', backgroundColor: 'transparent' } }}
      >
        <CreateUpdateInventoryModal onCloseModal={closeModal} isEdit inventoryId={selectedRow?.id} />
      </Modal>

      <InventoryDetailModal isVisible={isDetailModalVisible} onClose={closeDetailModal} inventoryData={selectedRow} />
    </>
  )
}

export default Inventory
