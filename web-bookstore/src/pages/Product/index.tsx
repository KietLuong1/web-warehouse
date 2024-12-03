import { DeleteOutlined, EditOutlined } from '@mui/icons-material'
import { Modal, Tooltip } from 'antd'
import { useCallback, useState } from 'react'
import { CustomTableSearch } from '../../components/CustomTableSearch'
import { CustomTable } from '../../components/Table'
import { Toastify } from '../../components/Toastify'
import { ProductTypes } from '../../queries'
import { useDeleteProduct } from '../../queries/Product/useDeleteProduct'
import { useGetListProducts } from '../../queries/Product/useGetListProducts'
import { allColumns } from './allColumns'
import { CreateUpdateProductModal } from './CreateUpdateProductModal'
import { ProductToolbar } from './ProductToolbar'

function Product() {
  const { data, isFetching, handleInvalidateListProducts } = useGetListProducts()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedRow, setSelectedRow] = useState<ProductTypes | undefined>(undefined)

  const closeModal = useCallback(() => {
    setIsModalVisible(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalVisible])

  const { onDeleteProduct } = useDeleteProduct({
    onSuccess() {
      Toastify(`success`, `Deleted Product successfully!`)
      handleInvalidateListProducts()
    }
  })

  const handleDeleteRecord = useCallback(
    (rowData: ProductTypes) => {
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

  const renderRowActions = (row: ProductTypes) => (
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
      <CustomTable<ProductTypes>
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
        renderToolbarInternalActions={({ table }) => <ProductToolbar table={table} />}
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
        <CreateUpdateProductModal onCloseModal={closeModal} isEdit productId={selectedRow?.productId} />
      </Modal>
    </>
  )
}

export default Product
