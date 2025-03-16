import { DeleteOutlined, EditOutlined } from '@mui/icons-material'
import { Modal, Tooltip } from 'antd'
import { useCallback, useState } from 'react'
import { CustomTableSearch } from '../../components/CustomTableSearch'
import { CustomTable } from '../../components/Table'
import { Toastify } from '../../components/Toastify'
import { TransactionResponse, TransactionTypes } from '../../queries'
import { useDeleteTransaction } from '../../queries/Transaction/useDeleteTransactiont'
import { useGetListTransactions } from '../../queries/Transaction/useGetListTransactions'
import { allColumns } from './allColumns'
import { CreateUpdateTransactionModal } from './CreateUpdateTransactionModal'
import { TransactionToolbar } from './TransactionToolbar'
import { TransactionDetailModal } from './TransactionDetailModel'

function Transaction() {
  const { data, isFetching, handleInvalidateListTransactions } = useGetListTransactions()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)

  const [selectedRow, setSelectedRow] = useState<TransactionResponse | undefined>(undefined)

  const closeModal = useCallback(() => {
    setIsModalVisible(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalVisible])

  const closeDetailModal = useCallback(() => {
    setIsDetailModalVisible(false)
  }, [isDetailModalVisible])

  const { onDeleteTransaction } = useDeleteTransaction({
    onSuccess() {
      Toastify(`success`, `Deleted record successfully!`)
      handleInvalidateListTransactions()
    }
  })

  const handleDeleteRecord = useCallback(
    (rowData: TransactionTypes) => {
      Modal.confirm({
        title: 'Are you sure?',
        content: 'This action cannot be undone.',
        centered: true,
        onOk() {
          onDeleteTransaction(rowData)
        }
      })
    },
    [onDeleteTransaction]
  )

  const renderRowActions = (row: TransactionResponse) => (
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

  const handleRowClick = useCallback((row: TransactionResponse) => {
    setSelectedRow(row)
    setIsDetailModalVisible(true)
  }, [])

  return (
    <>
      <CustomTable<TransactionResponse>
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
        renderToolbarInternalActions={({ table }) => <TransactionToolbar table={table} />}
        renderTopToolbarCustomActions={({ table }) => (
          <CustomTableSearch table={table} placeholder='Search by Name or Email' />
        )}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => handleRowClick(row.original),
          sx: { cursor: 'pointer' }
        })}
      />

      <Modal
        title='Edit Record'
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        centered
        styles={{ body: { maxHeight: '60vh', overflowY: 'auto', padding: '8px', backgroundColor: 'transparent' } }}
      >
        <CreateUpdateTransactionModal onCloseModal={closeModal} isEdit importId={selectedRow?.id} />
      </Modal>

      <TransactionDetailModal
        isVisible={isDetailModalVisible}
        onClose={closeDetailModal}
        transactionData={selectedRow}
      />
    </>
  )
}

export default Transaction
