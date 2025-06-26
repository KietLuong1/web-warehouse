import { DeleteOutlined, EditOutlined } from '@mui/icons-material'
import { Modal, Tooltip } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { CustomTableSearch } from '../../components/CustomTableSearch'
import { CustomTable } from '../../components/Table'
import { Toastify } from '../../components/Toastify'
import { WarehouseDTO } from '../../queries'
import { useDeleteLocation } from '../../queries/Location/useDeleteLocation'
import { useGetListLocation } from '../../queries/Location/useGetListLocation'
import { allColumns } from './allColumns'
import { CreateUpdateLocationModal } from './CreateUpdateLocationModal'
import { LocationDetailModal } from './LocationDetailModel'
import { LocationToolbar } from './LocationToolbar'
import { useSearchParams } from 'react-router-dom'

function Location() {
  const [searchParams, setSearchParams] = useSearchParams()
  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10)
  const sizeFromUrl = parseInt(searchParams.get('size') || '10', 10)
  const keywordFromUrl = searchParams.get('keyword') || ''
  const [searchKeyword, setSearchKeyword] = useState(keywordFromUrl)

  const [paginationState, setPaginationState] = useState({
    pageIndex: pageFromUrl - 1,
    pageSize: sizeFromUrl
  })

  const { data, isFetching, handleInvalidateListLocation, totalElements, totalPages, setParams } = useGetListLocation({
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

  const [selectedRow, setSelectedRow] = useState<WarehouseDTO | undefined>(undefined)

  const closeModal = useCallback(() => {
    setIsModalVisible(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalVisible])

  const closeDetailModal = useCallback(() => {
    setIsDetailModalVisible(false)
  }, [isDetailModalVisible])

  const { onDeleteLocation } = useDeleteLocation({
    onSuccess() {
      Toastify(`success`, `Deleted record successfully!`)
      handleInvalidateListLocation()
    }
  })

  const handleDeleteRecord = useCallback(
    (rowData: WarehouseDTO) => {
      Modal.confirm({
        title: 'Are you sure?',
        content: 'This action cannot be undone.',
        centered: true,
        onOk() {
          onDeleteLocation(rowData)
        }
      })
    },
    [onDeleteLocation]
  )

  const renderRowActions = (row: WarehouseDTO) => (
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

  const handleRowClick = useCallback((row: WarehouseDTO) => {
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
      <CustomTable<WarehouseDTO>
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
        renderToolbarInternalActions={({ table }) => <LocationToolbar table={table} />}
        renderTopToolbarCustomActions={({ table }) => (
          <CustomTableSearch
            onSearch={handleSearch}
            searchText={searchKeyword}
            table={table}
            placeholder='Search by Name'
          />
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
          setParams({
            page: newPagination.pageIndex + 1,
            size: newPagination.pageSize,
            keyword: searchKeyword
          })
        }}
      />
      <Modal
        title='Edit Record'
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        centered
        styles={{ body: { maxHeight: '60vh', overflowY: 'auto', padding: '8px', backgroundColor: 'transparent' } }}
      >
        <CreateUpdateLocationModal onCloseModal={closeModal} isEdit locationId={selectedRow?.id} />
      </Modal>

      <LocationDetailModal isVisible={isDetailModalVisible} onClose={closeDetailModal} locationData={selectedRow} />
    </>
  )
}

export default Location
