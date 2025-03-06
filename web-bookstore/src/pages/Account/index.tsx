import { EditOutlined } from '@mui/icons-material'
import { Modal, Tooltip } from 'antd'
import { useCallback, useState } from 'react'
import { CustomTableSearch } from '../../components/CustomTableSearch'
import { CustomTable } from '../../components/Table'
import { AccountTypes } from '../../queries/Account_MockData'
import { useGetListAccount } from '../../queries/Account_MockData/useGetListAccounts'
import { AccountToolbar } from './AccountToolbar'
import { allColumns } from './allColumns'
import { CreateUpdateAccountModal } from './CreateUpdateInventoryModal'
import { AccountDetailModal } from './AccountDetailModel'

function Account() {
  const { isFetching, data } = useGetListAccount()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)

  const [selectedRow, setSelectedRow] = useState<AccountTypes>()
  // Remove unnecessary query parameters

  const closeModal = useCallback(() => {
    setIsModalVisible(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalVisible])

  const closeDetailModal = useCallback(() => {
    setIsDetailModalVisible(false)
  }, [isDetailModalVisible])

  // useEffect(() => {
  //   setParams({
  //     pageNumber: 0,
  //     pageSize: 10
  //   })
  // }, [pageNumber, pageSize, setParams])

  const renderRowActions = (row: AccountTypes) => (
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
    </div>
  )

  const handleRowClick = useCallback((row: AccountTypes) => {
    setSelectedRow(row)
    setIsDetailModalVisible(true)
  }, [])

  return (
    <>
      <CustomTable
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
        renderToolbarInternalActions={({ table }) => <AccountToolbar table={table} />}
        renderTopToolbarCustomActions={({ table }) => <CustomTableSearch table={table} placeholder='Search by Name' />}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => handleRowClick(row.original),
          sx: { cursor: 'pointer' }
        })}
      />
      <Modal
        title='Edit Account'
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        centered
        styles={{ body: { maxHeight: '60vh', overflowY: 'auto', padding: '8px', backgroundColor: 'transparent' } }}
      >
        <CreateUpdateAccountModal onCloseModal={closeModal} isEdit userId={selectedRow?.userId} />
      </Modal>

      <AccountDetailModal isVisible={isDetailModalVisible} onClose={closeDetailModal} accountData={selectedRow} />
    </>
  )
}

export default Account
