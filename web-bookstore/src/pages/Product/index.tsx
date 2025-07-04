import { DeleteOutlined, EditOutlined } from '@mui/icons-material'
import { Modal, Tooltip } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CustomTableSearch } from '../../components/CustomTableSearch'
import { CustomTable } from '../../components/Table'
import { Toastify } from '../../components/Toastify'
import { ProductDTO } from '../../queries'
import { useDeleteProduct } from '../../queries/Product/useDeleteProduct'
import { useGetListProducts } from '../../queries/Product/useGetListProducts'
import { useGetListCategories } from '../../queries/Setting/useGetListCategories'
import { allColumns } from './allColumns'
import { CreateUpdateProductModal } from './CreateUpdateProductModal'
import { ProductDetailModal } from './ProductDetailModel'
import { ProductToolbar } from './ProductToolbar'

function Product() {
  const [searchParams, setSearchParams] = useSearchParams()

  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10)
  const sizeFromUrl = parseInt(searchParams.get('size') || '10', 10)
  const keywordFromUrl = searchParams.get('keyword') || ''
  const categoryIdFromUrl = searchParams.get('categoryId') || ''
  const warehouseIdFromUrl = searchParams.get('warehouseId') || ''

  const [searchKeyword, setSearchKeyword] = useState(keywordFromUrl)
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryIdFromUrl)
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(warehouseIdFromUrl)

  const [paginationState, setPaginationState] = useState({
    pageIndex: pageFromUrl - 1,
    pageSize: sizeFromUrl
  })

  const { products, isFetching, handleInvalidateListProducts, setParams, totalPages, totalElements } =
    useGetListProducts({
      page: paginationState.pageIndex + 1,
      size: paginationState.pageSize,
      keyword: searchKeyword,
      categoryId: selectedCategoryId,
      warehouseId: selectedWarehouseId
    })

  useEffect(() => {
    setParams({
      page: paginationState.pageIndex + 1,
      size: paginationState.pageSize,
      keyword: searchKeyword,
      categoryId: selectedCategoryId,
      warehouseId: selectedWarehouseId
    })
  }, [
    paginationState.pageIndex,
    paginationState.pageSize,
    searchKeyword,
    selectedCategoryId,
    selectedWarehouseId,
    setParams
  ])

  useEffect(() => {
    const categoryIdFromUrl = searchParams.get('categoryId') || ''
    const warehouseIdFromUrl = searchParams.get('warehouseId') || ''
    setSelectedCategoryId(categoryIdFromUrl)
    setSelectedWarehouseId(warehouseIdFromUrl)
  }, [searchParams])

  const { categories } = useGetListCategories()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)

  const [selectedRow, setSelectedRow] = useState<ProductDTO | undefined>(undefined)

  const closeModal = useCallback(() => {
    setIsModalVisible(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalVisible])
  const closeDetailModal = useCallback(() => {
    setIsDetailModalVisible(false)
  }, [])

  const { onDeleteProduct } = useDeleteProduct({
    onSuccess() {
      Toastify(`success`, `Deleted Product successfully!`)
      handleInvalidateListProducts()
    }
  })

  const handleDeleteRecord = useCallback(
    (rowData: ProductDTO) => {
      Modal.confirm({
        title: 'Are you sure?',
        content: 'This action cannot be undone.',
        centered: true,
        onOk() {
          onDeleteProduct(rowData)
        }
      })
    },
    [onDeleteProduct]
  )

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

    if (selectedCategoryId && selectedCategoryId.trim() !== '') {
      params.categoryId = selectedCategoryId
    }

    if (selectedWarehouseId && selectedWarehouseId.trim() !== '') {
      params.warehouseId = selectedWarehouseId
    }

    setSearchParams(params)
  }
  const renderRowActions = (row: ProductDTO) => (
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

  const handleRowClick = useCallback((row: ProductDTO) => {
    setSelectedRow(row)
    setIsDetailModalVisible(true)
  }, [])

  return (
    <>
      <CustomTable<ProductDTO>
        data={products || []}
        isLoading={isFetching}
        columns={allColumns}
        isLayoutGridMode
        enableDensityToggle={false}
        enableColumnDragging={false}
        enableRowActions
        renderRowActions={({ row }) => renderRowActions(row.original)}
        isColumnPinning={true}
        nameColumnPinning='mrt-row-actions'
        renderToolbarInternalActions={({ table }) => <ProductToolbar table={table} />}
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
        meta={{ categories }}
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
            keyword: searchKeyword,
            categoryId: selectedCategoryId,
            warehouseId: selectedWarehouseId
          })
        }}
      />
      <Modal
        title='Edit Record'
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        centered
        styles={{
          body: {
            maxHeight: '60vh',
            overflowY: 'auto',
            padding: '8px',
            backgroundColor: 'transparent'
          }
        }}
      >
        <CreateUpdateProductModal onCloseModal={closeModal} isEdit productId={selectedRow?.productId} />
      </Modal>

      <ProductDetailModal isVisible={isDetailModalVisible} onClose={closeDetailModal} productData={selectedRow} />
    </>
  )
}

export default Product
