import { DeleteOutlined, EditOutlined } from '@mui/icons-material'
import { Modal, Tooltip } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { CustomTableSearch } from '../../components/CustomTableSearch'
import { CustomTable } from '../../components/Table'
import { Toastify } from '../../components/Toastify'
import { SupplierDTO } from '../../queries'
import { useDeleteSupplier } from '../../queries/Supplier/useDeleteSupplier'
import { useGetListSuppliers } from '../../queries/Supplier/useGetListSuppliers'
import { allColumns } from './allColumns'
import { CreateUpdateSupplierModal } from './CreateUpdateSupplierModal'
import { SupplierDetailModal } from './SupplierDetailModel'
import { SupplierToolbar } from './SupplierToolbar'
import { useSearchParams } from 'react-router-dom'

function Supplier() {
  const [searchParams, setSearchParams] = useSearchParams()
  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10)
  const sizeFromUrl = parseInt(searchParams.get('size') || '10', 10)
  const keywordFromUrl = searchParams.get('keyword') || ''
  const [searchKeyword, setSearchKeyword] = useState(keywordFromUrl)

  const [paginationState, setPaginationState] = useState({
    pageIndex: pageFromUrl - 1,
    pageSize: sizeFromUrl
  })

  const { suppliers, isFetching, handleInvalidateListSuppliers, setParams, totalPages, totalElements } =
    useGetListSuppliers({
      page: paginationState.pageIndex + 1,
      size: paginationState.pageSize,
      keyword: searchKeyword
    })

  useEffect(() => {
    setParams({
      page: paginationState.pageIndex + 1,
      size: paginationState.pageSize,
      keyword: searchKeyword
    })
  }, [paginationState.pageIndex, paginationState.pageSize, searchKeyword, setParams])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)

  const [selectedRow, setSelectedRow] = useState<SupplierDTO | undefined>(undefined)

  const closeModal = useCallback(() => {
    setIsModalVisible(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalVisible])

  const closeDetailModal = useCallback(() => {
    setIsDetailModalVisible(false)
  }, [isDetailModalVisible])

  const { onDeleteSupplier } = useDeleteSupplier({
    onSuccess() {
      Toastify(`success`, `Deleted supplier successfully!`)
      handleInvalidateListSuppliers()
    }
  })

  const handleDeleteRecord = useCallback(
    (rowData: SupplierDTO) => {
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

  const renderRowActions = (row: SupplierDTO) => (
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

  const handleRowClick = useCallback((row: SupplierDTO) => {
    setSelectedRow(row)
    setIsDetailModalVisible(true)
  }, [])

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword)
    setPaginationState((prev) => ({
      ...prev,
      pageIndex: 0
    }))

    const params: Record<string, string> = {
      page: '1',
      size: paginationState.pageSize.toString()
    }

    if (keyword && keyword.trim() !== '') {
      params.keyword = keyword
    }

    setSearchParams(params)
  }

  return (
    <>
      <CustomTable<SupplierDTO>
        data={suppliers || []}
        isLoading={isFetching}
        columns={allColumns}
        isLayoutGridMode
        enableDensityToggle={false}
        enableColumnDragging={false}
        enableRowActions
        renderRowActions={({ row }) => renderRowActions(row.original)}
        isColumnPinning={true}
        nameColumnPinning='mrt-row-actions'
        renderToolbarInternalActions={({ table }) => <SupplierToolbar table={table} />}
        renderTopToolbarCustomActions={({ table }) => (
          <CustomTableSearch
            table={table}
            placeholder='Search by Name'
            onSearch={handleSearch}
            searchText={searchKeyword}
          />
        )}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => handleRowClick(row.original),
          sx: { cursor: 'pointer' }
        })}
        meta={{ suppliers }}
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
          setParams({
            page: newPagination.pageIndex + 1,
            size: newPagination.pageSize,
            keyword: searchKeyword
          })
        }}
      />

      <Modal
        title='Edit Supplier'
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        centered
        styles={{ body: { maxHeight: '60vh', overflowY: 'auto', padding: '8px', backgroundColor: 'transparent' } }}
      >
        <CreateUpdateSupplierModal onCloseModal={closeModal} isEdit supplierId={selectedRow?.id} />
      </Modal>

      <SupplierDetailModal isVisible={isDetailModalVisible} onClose={closeDetailModal} supplierData={selectedRow} />
    </>
  )
}

export default Supplier
