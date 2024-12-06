import { EditOutlined } from '@mui/icons-material'
import { Modal, Tooltip } from 'antd'
import { useCallback, useState } from 'react'
import { CustomTableSearch } from '../../components/CustomTableSearch'
import { CustomTable } from '../../components/Table'
import { AccountTypes } from '../../queries/Account'
import { useGetListAccount } from '../../queries/Account/useGetListAccount'
import { AccountToolbar } from './AccountToolbar'
import { allColumns } from './allColumns'
import { CreateUpdateAccountModal } from './CreateUpdateInventoryModal'

function Account() {
  const { data, isFetching } = useGetListAccount()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedRow, setSelectedRow] = useState<AccountTypes | undefined>(undefined)

  const closeModal = useCallback(() => {
    setIsModalVisible(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalVisible])

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
      <CustomTable<AccountTypes>
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
      />
      <Modal
        title='Edit Inventory'
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        centered
        styles={{ body: { maxHeight: '60vh', overflowY: 'auto', padding: '8px', backgroundColor: 'transparent' } }}
      >
        <CreateUpdateAccountModal onCloseModal={closeModal} isEdit accountId={selectedRow?.account_id} />
      </Modal>
    </>
  )
}

export default Account
