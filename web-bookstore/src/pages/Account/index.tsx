import { EditOutlined } from '@mui/icons-material'
import { Modal, Tooltip } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { CustomTableSearch } from '../../components/CustomTableSearch'
import { CustomTable } from '../../components/Table'
import { AccountTypes } from '../../queries/Account'
import { useGetListAccount } from '../../queries/Account/useGetListAccount'
import { AccountToolbar } from './AccountToolbar'
import { allColumns } from './allColumns'
import { CreateUpdateAccountModal } from './CreateUpdateInventoryModal'

function Account() {
  const { userDtos, isFetching, setParams, pageNumber, pageSize, totalPages } = useGetListAccount()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedRow, setSelectedRow] = useState<AccountTypes>()
  // Remove unnecessary query parameters

  const closeModal = useCallback(() => {
    setIsModalVisible(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalVisible])

  useEffect(() => {
    setParams({
      pageNumber: 0,
      pageSize: 10
    })
  }, [pageNumber, pageSize, setParams])

  const renderRowActions = (row: AccountTypes) => (
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
    </div>
  )

  return (
    <>
      <CustomTable
        data={userDtos}
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
        rowCount={totalPages}
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
    </>
  )
}

export default Account
