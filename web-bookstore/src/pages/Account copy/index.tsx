import { EditOutlined } from '@mui/icons-material'
import { Modal, Tooltip, Spin } from 'antd'
import { useCallback, useState } from 'react'
import { CustomTableSearch } from '../../components/CustomTableSearch'
import { CustomTable } from '../../components/Table'
import { AccountApiResponse } from '../../queries/Account'
import { AccountDetailModal } from './AccountDetailModel'
import { AccountToolbar } from './AccountToolbar'
import { allColumns } from './allColumns'
import { CreateUpdateAccountModal } from './CreateUpdateAccountModal'
import { useGetListAccount } from '../../queries/Account/useGetListAccount'
import { useGetAccountDetail } from '../../queries/Account/useGetAccountDetail'

function Account() {
  // initialise pagination: page 0, size 10
  const { accounts, isFetching, pageNumber, pageSize, totalPages, setParams, invalidate } = useGetListAccount({
    pageNumber: 0,
    pageSize: 10
  })

  const [modalUserId, setModalUserId] = useState<number | undefined>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [detailUserId, setDetailUserId] = useState<number | undefined>()
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const openEdit = (id: number) => {
    setModalUserId(id)
    setIsModalOpen(true)
  }

  const {
    data: detailData,
    isFetching: detailLoading,
    refetch: refetchDetail
  } = useGetAccountDetail(detailUserId ?? 0, {
    queryKey: ['user', detailUserId ?? 0],
    enabled: isDetailOpen && !!detailUserId
  })

  const openDetail = (id: number) => {
    setDetailUserId(id)
    setIsDetailOpen(true)
  }

  const closeDetail = () => {
    setIsDetailOpen(false)
    setDetailUserId(undefined)
  }

  return (
    <>
      <CustomTable
        data={accounts}
        isLoading={isFetching}
        columns={allColumns}
        isLayoutGridMode
        enableDensityToggle={false}
        enableColumnDragging={false}
        enableRowActions
        renderRowActions={({ row }) => (
          <div style={{ display: 'flex', gap: 8 }}>
            <Tooltip title='Edit'>
              <EditOutlined
                onClick={(e) => {
                  e.stopPropagation()
                  openEdit(row.original.userId)
                }}
              />
            </Tooltip>
          </div>
        )}
        manualPagination // ← enable server‑side paging
        pageCount={totalPages}
        state={{
          pagination: { pageIndex: pageNumber, pageSize }
        }}
        onPaginationChange={(updater) => {
          const { pageIndex, pageSize } =
            typeof updater === 'function' ? updater({ pageIndex: 0, pageSize: 10 }) : updater
          setParams({ pageNumber: pageIndex, pageSize })
        }}
        renderToolbarInternalActions={({ table }) => <AccountToolbar table={table} onRefresh={invalidate} />}
        renderTopToolbarCustomActions={({ table }) => <CustomTableSearch table={table} placeholder='Search by Name' />}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => openDetail(row.original.userId),
          sx: { cursor: 'pointer' }
        })}
      />

      <Modal
        title={modalUserId ? 'Edit Account' : 'Create Account'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        bodyStyle={{ maxHeight: '60vh', overflowY: 'auto', padding: 8 }}
      >
        <CreateUpdateAccountModal
          userId={modalUserId ? String(modalUserId) : undefined}
          isEdit={!!modalUserId}
          onCloseModal={() => {
            invalidate() // re-fetch users
            setIsModalOpen(false) // then close
          }}
        />
      </Modal>

      <AccountDetailModal isVisible={isDetailOpen} onClose={closeDetail} accountData={detailData} />
    </>
  )
}

// function Account() {
//   const { isFetching, data } = useGetListAccount()
//   const [isModalVisible, setIsModalVisible] = useState(false)
//   const [selectedRow, setSelectedRow] = useState<AccountApiResponse>()
//   const [isDetailModalVisible, setIsDetailModalVisible] = useState(false)

//   const closeModal = useCallback(() => {
//     setIsModalVisible(false)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isModalVisible])

//   const closeDetailModal = useCallback(() => {
//     setIsDetailModalVisible(false)
//   }, [isDetailModalVisible])

//   const renderRowActions = (row: AccountApiResponse) => (
//     <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
//       <Tooltip title='Edit'>
//         <EditOutlined
//           style={{ fontSize: '16px', color: 'blue', cursor: 'pointer' }}
//           onClick={(e) => {
//             e.stopPropagation()
//             setIsModalVisible(true)
//             setSelectedRow(row)
//           }}
//         />
//       </Tooltip>
//     </div>
//   )

//   const handleRowClick = useCallback((row: AccountApiResponse) => {
//     setSelectedRow(row)
//     setIsDetailModalVisible(true)
//   }, [])

//   return (
//     <>
//       <CustomTable
//         data={data || []}
//         isLoading={isFetching}
//         columns={allColumns}
//         isLayoutGridMode
//         enableDensityToggle={false}
//         enableColumnDragging={false}
//         enableRowActions
//         renderRowActions={({ row }) => renderRowActions(row.original)}
//         isColumnPinning={true}
//         nameColumnPinning='mrt-row-actions'
//         initialState={{ columnPinning: { right: ['mrt-row-actions'] } }}
//         renderToolbarInternalActions={({ table }) => <AccountToolbar table={table} />}
//         renderTopToolbarCustomActions={({ table }) => <CustomTableSearch table={table} placeholder='Search by Name' />}
//         muiTableBodyRowProps={({ row }) => ({
//           onClick: () => handleRowClick(row.original),
//           sx: { cursor: 'pointer' }
//         })}
//       />
//       <Modal
//         title='Edit Account'
//         open={isModalVisible}
//         onCancel={closeModal}
//         footer={null}
//         centered
//         styles={{ body: { maxHeight: '60vh', overflowY: 'auto', padding: '8px', backgroundColor: 'transparent' } }}
//       >
//         <CreateUpdateAccountModal onCloseModal={closeModal} isEdit userId={selectedRow?.userId} />
//       </Modal>

//       <AccountDetailModal isVisible={isDetailModalVisible} onClose={closeDetailModal} accountData={selectedRow} />
//     </>
//   )
// }

export default Account
